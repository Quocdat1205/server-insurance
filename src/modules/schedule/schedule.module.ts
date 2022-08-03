import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  InsuranceSchema,
  Insurance,
  TimeGetInsurance,
  TimeGetInsuranceSchema,
} from '@schema';
import { LoggerService } from '@modules/logger/logger.service';
import { ScInsuranceService } from '@modules/scInsurance/scInsurance.service';
import { BinanceService } from '@modules/binance/binance.service';
import { BscService } from '@modules/contract/bsc/bsc.service';
import { TaskService } from './schedule.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Insurance.name, schema: InsuranceSchema },
      { name: TimeGetInsurance.name, schema: TimeGetInsuranceSchema },
    ]),
  ],
  providers: [
    LoggerService,
    ScInsuranceService,
    BinanceService,
    BscService,
    TaskService,
  ],
})
export class TaskModule {}
