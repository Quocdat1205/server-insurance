import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from '@modules/user/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(props: AuthDto): Promise<any> {
    console.log('LOCAL', props);

    const user = await this.authService.loginWithCredentials(props);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
