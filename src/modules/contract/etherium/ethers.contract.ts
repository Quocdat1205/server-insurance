import { VoidSigner } from '@ethersproject/abstract-signer';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { Provider as AbstractProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';

export class EthersContract {
  public readonly provider: AbstractProvider;

  constructor(provider: AbstractProvider) {
    this.provider = provider;
  }

  public createContract(
    address: string,
    abi: ContractInterface,
    signer?: Wallet | VoidSigner,
  ): Contract {
    return new Contract(address, abi, signer ?? this.provider);
  }
}
