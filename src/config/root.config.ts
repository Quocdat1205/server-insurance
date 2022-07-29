import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import validationEnv from './joi.config';
import env from '@utils/constant/env';
import { InsuranceModule } from '@modules/insurance/insurance.module';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ScInsuranceModule } from '@modules/scInsurance/scInsurance.module';

export const RootModule = [
  ConfigModule.forRoot({
    validationSchema: Joi.object({
      validationEnv,
    }),
    isGlobal: true,
  }),
  JwtModule.register({
    secretOrPrivateKey: `${env.SECRET_KEY || 'nami'}`,
    signOptions: {
      expiresIn: 1000 * 60 * 60 * 6, // 6 hour,
    },
  }),
  ScheduleModule.forRoot(),
  MongooseModule.forRoot(env.MONGO_URL),
  UserModule,
  AuthModule,
  InsuranceModule,
  ScInsuranceModule,
];
