import { Injectable } from '@nestjs/common';
import { BscService } from '@modules/contract/bsc/bsc.service';
import { Wallet } from '@ethersproject/wallet';
import { Contract } from '@ethersproject/contracts';
import { INSURANCE_ABI } from '@utils/abi/INSURANCE_ABI';
import { UpdateInsuranceDto } from './scInsurance.dto';
import { Interval } from '@nestjs/schedule';
import {
  TimeGetInsurance,
  TimeGetInsuranceType,
  Insurance,
  InsuranceType,
} from '@schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { convertDateToTimeStamp, weiToEther } from 'src/helper/handler';
import { EventFilter, utils } from 'ethers';
import env from '@utils/constant/env';
import { NAIN_TOKEN_ABI } from '@utils/abi/NAIN_TOKEN_ABI';

@Injectable()
export class ScInsuranceService {
  private singer: Wallet;
  private contractInsurance: Contract;
  private getTopicEvent: EventFilter;
  private contractNain: Contract;

  constructor(
    private readonly bscService: BscService,
    @InjectModel(TimeGetInsurance.name)
    private readonly modleGetTineInsurance: Model<TimeGetInsuranceType>,
    @InjectModel(Insurance.name)
    private readonly modelInsurance: Model<InsuranceType>,
  ) {
    this.singer = this.bscService.createWallet(env.PRIVATE_KEY);
    this.contractInsurance = this.bscService.createContract(
      env.CONTRACT_ADDRESS_INSURANCE,
      INSURANCE_ABI,
      this.singer,
    );
    this.contractNain = this.bscService.createContract(
      env.CONTRACT_ADDRESS_NAIN,
      NAIN_TOKEN_ABI,
      this.singer,
    );
    this.getTopicEvent = this.contractInsurance.filters.EBuyInsurance(); // event create new insurance on smartcontract
  }

  public async refundNAIN(address: string, amount: number) {
    const connect = await this.contractNain
      .connect(this.singer)
      .transfer(`${address}`, utils.parseEther(`${amount}`));

    await connect.wait();

    return connect;
  }

  public async updateStateSmartContract(props: UpdateInsuranceDto) {
    const { idInsurance, state } = props;

    const tx = await this.contractInsurance
      .connect(this.singer)
      .updateStateInsurance(idInsurance, state);

    return tx;
  }

  @Interval('tracker-smart-contract', 1000 * 60 * 5) // 5 minutes
  public async emitEventSmartContract() {
    try {
      // get time block start and time end
      const getTime = await this.modleGetTineInsurance.findOne({}).exec();

      if (!getTime)
        await new this.modleGetTineInsurance({
          startTime: env.BLOCK_TIME_SC,
          endTime: convertDateToTimeStamp(env.BLOCK_TIME_SC, env.TIME_SCHEDULE),
        }).save();
      else
        await this.modleGetTineInsurance
          .findOneAndUpdate(
            {
              startTime: getTime.startTime,
            },
            {
              startTime: getTime.endTime,
              endTime: convertDateToTimeStamp(
                getTime.endTime,
                env.TIME_SCHEDULE,
              ),
            },
          )
          .exec();

      const event = await this.contractInsurance.queryFilter(
        this.getTopicEvent,
        getTime
          ? getTime.startTime
          : convertDateToTimeStamp(env.BLOCK_TIME_SC, 0),
        getTime
          ? getTime.endTime
          : convertDateToTimeStamp(env.BLOCK_TIME_SC, env.TIME_SCHEDULE),
      );

      if (event.length > 0) {
        const { length } = event;

        for (let i = 0; i < length; i++) {
          const checkExitsInsurance = await this.modelInsurance.findOne({
            transaction_hash: event[i].transactionHash,
          });

          const args = event[i].args;

          if (!checkExitsInsurance)
            await new this.modelInsurance({
              owner: args[1],
              transaction_hash: event[i].transactionHash,
              id_sc: Number(args[0]),
              asset: args[3],
              escrow: weiToEther(args[2]),
              p_start: Number(args[5]),
              p_claim: Number(args[4]),
              expired: Number(args[7]),
              state: args[6],
              side: Number(args[5]) > Number(args[4]) ? 'Buy' : 'Sell',
            }).save();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
