import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import env from '@utils/constant/env';
import { UserService } from '@modules/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@schema';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: 1000 * 60 * 60 * 6, // 6 hour,
      },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [AuthService, JwtService, UserService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
