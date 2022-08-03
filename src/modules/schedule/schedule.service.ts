import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Insurance, InsuranceType } from '@schema';
import { LoggerService } from '@modules/logger/logger.service';
import { ScInsuranceService } from '@modules/scInsurance/scInsurance.service';
import { Interval, Cron } from '@nestjs/schedule';
import { StateInsuranceRole } from '@modules/scInsurance/scInsurance.dto';
import { BinanceService } from '@modules/binance/binance.service';
import { BscService } from '@modules/contract/bsc/bsc.service';
import env from '@utils/constant/env';
import { NAIN_TOKEN_ABI } from '@utils/abi/NAIN_TOKEN_ABI';
import { Contract } from '@ethersproject/contracts';
import { Wallet } from '@ethersproject/wallet';

@Injectable()
export class TaskService {
  private contractNain: Contract;
  private singer: Wallet;

  constructor(
    @InjectModel(Insurance.name)
    private readonly modelInsurance: Model<InsuranceType>,
    private readonly scInsuranceService: ScInsuranceService,
    private readonly binanceService: BinanceService,
    private readonly bscService: BscService,
  ) {
    this.contractNain = this.bscService.createContract(
      env.CONTRACT_ADDRESS_NAIN,
      NAIN_TOKEN_ABI,
      this.singer,
    );
  }

  @Interval('check price touch', 1000 * 60 * 1) // 1 minutes
  public async taskUpdateStateInsurance() {
    LoggerService.log(`task update insurance`);

    const insurance_available = await this.modelInsurance.find({
      state: StateInsuranceRole.PAYOUT_WAITING,
    });

    if (insurance_available.length === 0) return;

    // get price futures binance
    const priceFutures = await this.binanceService.getPriceFutures();

    const { length } = insurance_available;

    // start for loop
    for (let i = 0; i < length; i++) {
      const symbol = insurance_available[i].asset;
      const current_price = priceFutures[`${symbol}USDT`];
      const current_date = new Date().getTime() * 1000; // get timestamp today

      if (insurance_available[i].expired < current_date) {
        await this.scInsuranceService.updateStateSmartContract({
          idInsurance: insurance_available[i].id_sc,
          state: StateInsuranceRole.EXPIRED,
        });
        await this.modelInsurance.updateOne(
          {
            _id: insurance_available[i]._id,
          },
          {
            $set: {
              state: StateInsuranceRole.EXPIRED,
              updatedAt: new Date(),
            },
          },
        );
      } else {
        if (
          (insurance_available[i].side === 'Buy' &&
            current_price > insurance_available[i].p_claim) ||
          (insurance_available[i].side === 'Sell' &&
            current_price < insurance_available[i].p_claim)
        ) {
          await this.scInsuranceService.updateStateSmartContract({
            idInsurance: insurance_available[i].id_sc,
            state: StateInsuranceRole.PAYOUT_WAITING,
          });
          await this.modelInsurance.updateOne(
            {
              _id: insurance_available[i]._id,
            },
            {
              $set: {
                state: StateInsuranceRole.PAYOUT_WAITING,
                updatedAt: new Date(),
              },
            },
          );
        }
      }
    }
    // end for loop
  }

  @Cron('1 0 0 * * *')
  //   @Cron('* * * * * *')
  public async checkExpiredInsurance() {
    const insurance_payout_waiting = await this.modelInsurance.find({
      state: StateInsuranceRole.PAYOUT_WAITING,
    });

    if (insurance_payout_waiting.length === 0) return;

    const current_date = new Date().getTime() * 1000; // get timestamp today

    const { length } = insurance_payout_waiting;

    for (let i = 0; i < length; i++) {
      if (insurance_payout_waiting[i].expired < current_date) {
        const updateInsurance =
          await this.scInsuranceService.updateStateSmartContract({
            idInsurance: insurance_payout_waiting[i].id_sc,
            state: StateInsuranceRole.PAID,
          });

        if (updateInsurance) {
          await this.scInsuranceService.refundNAIN(
            insurance_payout_waiting[i].owner,
            insurance_payout_waiting[i].cover_payout,
          );
        }

        await this.modelInsurance.updateOne(
          {
            _id: insurance_payout_waiting[i]._id,
          },
          {
            $set: {
              state: StateInsuranceRole.PAID,
              updatedAt: new Date(),
              isClaim: true,
            },
          },
        );
      }
    }
  }
}
