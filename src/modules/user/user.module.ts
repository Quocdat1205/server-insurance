import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@schema';
import { UserService } from './user.service';
import { AuthService } from '@modules/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService],
})
export class UserModule {}
