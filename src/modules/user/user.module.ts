import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@schema';
import { UserService } from './user.service';
import { AuthService } from '@modules/auth/auth.service';
import { UserController } from './user.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import env from '@utils/constant/env';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: 1000 * 60 * 60 * 6, // 6 hour,
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService],
})
export class UserModule {}
