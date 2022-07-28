import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@modules/user/user.service';
import { User } from '@schema';
import { JwtDto, AuthDto } from '@modules/user/user.dto';
import { recoverPersonalSignature } from 'eth-sig-util';
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

  public async getNonce(props: JwtDto): Promise<User> {
    const user = await this.usersService.updateNonce(props);

    if (user) {
      return user;
    }

    return await this.usersService.createNewUser(props);
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
      throw new ForbiddenException('Problem with signature verification.');
    }

    if (recoveredAddr.toLowerCase() !== walletAddress.toLowerCase()) {
      throw new UnAuthorizedException('Signature is not correct.');
    }

    const payload = { walletAddress };

    return {
      access_token: this.generateToken(payload),
    };
  }

  private async generateToken(payload: any) {
    return this.jwtTokenService.sign(payload);
  }

  private async decodeToken(token: string) {
    const decode = this.jwtTokenService.decode(token);

    return decode;
  }

  private getMessage(nonce: number) {
    return `Sign message none: ${nonce}`;
  }
}
