import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@modules/user/user.service';
import { User } from '@schema';
import { JwtDto, AuthDto } from '@modules/user/user.dto';
import { recoverPersonalSignature } from 'eth-sig-util';
import env from '@utils/constant/env';
import {
  ForbiddenException,
  UnAuthorizedException,
} from '@config/exception.config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtTokenService: JwtService,
  ) {}

  public async getNonce(props: JwtDto): Promise<User | number> {
    const nonce = await this.usersService.updateNonce(props);

    if (nonce) {
      return nonce;
    }

    const user = await this.usersService.createNewUser(props);

    return user.nonce;
  }

  public async loginWithCredentials(props: AuthDto) {
    const { walletAddress, signature } = props;

    const user = await this.usersService.findOneUser({ walletAddress });
    let recoveredAddr: string;

    if (!user) {
      return new UnAuthorizedException('Nonce not found');
    }

    try {
      recoveredAddr = recoverPersonalSignature({
        data: this.getMessage(user.nonce),
        sig: signature,
      });
    } catch (err) {
      return new ForbiddenException('Problem with signature verification.');
    }

    if (recoveredAddr.toLowerCase() !== walletAddress.toLowerCase()) {
      return new UnAuthorizedException('Signature is not correct.');
    }

    const payload = { walletAddress, signature };

    return this.generateToken(payload);
  }

  private async generateToken(payload: any) {
    return this.jwtTokenService.sign(
      { payload },
      { secret: env.JWT_SECRET_KEY },
    );
  }

  private getMessage(nonce: number) {
    return `Sign message with nonce: ${nonce}`;
  }
}
