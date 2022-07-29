import { Injectable } from '@nestjs/common';
import { BscService } from '@modules/contract/bsc/bsc.service';
import { Wallet } from '@ethersproject/wallet';
import { Contract } from '@ethersproject/contracts';
import env from '@utils/constant/env';
import { NAIN_TOKEN_ABI } from '@utils/abi/NAIN_TOKEN_ABI';
import { UpdateInsuranceDto } from './scInsurance.dto';

@Injectable()
export class ScInsuranceService {
  private singer: Wallet;
  private contract: Contract;

  constructor(private readonly bscService: BscService) {
    this.singer = this.bscService.createWallet(env.PRIVATE_KEY);
    this.contract = this.bscService.createContract(
      env.CONTRACT_ADDRESS_NAIN,
      NAIN_TOKEN_ABI,
      this.singer,
    );
  }

  public async updateStateSmartContract(props: UpdateInsuranceDto) {
    const { idInsurance, state } = props;

    const tx = await this.contract
      .connect(this.singer)
      .updateStateInsurance(idInsurance, state);

    return tx;
  }
}
