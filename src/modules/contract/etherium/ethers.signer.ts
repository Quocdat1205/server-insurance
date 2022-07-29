import {
  ExternallyOwnedAccount,
  VoidSigner,
} from '@ethersproject/abstract-signer';
import { BytesLike } from '@ethersproject/bytes';
import { ProgressCallback } from '@ethersproject/json-wallets';
import { Provider as AbstractProvider } from '@ethersproject/providers';
import { SigningKey } from '@ethersproject/signing-key';
import { Wallet } from '@ethersproject/wallet';
import { Wordlist } from '@ethersproject/wordlists';
import { RandomWalletOptions } from './ethers.interface';
import { createBaseProvider } from '@modules/contract/etherium/ethers.providers';
import { BINANCE_TESTNET_NETWORK } from '@modules/contract/etherium';
import env from '@utils/constant/env';

export class EthersSigner {
  private provider: AbstractProvider;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(_provider: AbstractProvider) {
    this.initProvider();
  }

  private async initProvider() {
    const providers = await createBaseProvider({
      network: BINANCE_TESTNET_NETWORK,
      bscscan: env.URL_INFURA,
      chainId: 97,
    });

    this.provider = providers;
  }

  public createWallet(
    privateKey: BytesLike | ExternallyOwnedAccount | SigningKey,
  ): Wallet {
    return new Wallet(privateKey, this.provider);
  }

  createRandomWallet(options?: RandomWalletOptions): Wallet {
    const wallet = Wallet.createRandom(options) as Wallet;

    return wallet.connect(this.provider);
  }

  public async createWalletFromEncryptedJson(
    jsonString: string,
    password: BytesLike,
    progressCallback?: ProgressCallback,
  ): Promise<Wallet> {
    const wallet = await Wallet.fromEncryptedJson(
      jsonString,
      password,
      progressCallback,
    );

    return wallet.connect(this.provider);
  }

  public createWalletfromMnemonic(
    mnemonic: string,
    path?: string,
    wordlist?: Wordlist,
  ): Wallet {
    const wallet = Wallet.fromMnemonic(mnemonic, path, wordlist) as Wallet;

    return wallet.connect(this.provider);
  }

  public createVoidSigner(address: string): VoidSigner {
    return new VoidSigner(address, this.provider);
  }
}
