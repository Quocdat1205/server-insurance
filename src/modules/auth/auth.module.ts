import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import env from '@utils/constant/env';
import { UserService } from '@modules/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@schema';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: 1000 * 60 * 60 * 6, // 6 hour,
      },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [AuthService, JwtService, UserService],
  exports: [AuthService],
})
export class AuthModule {}
