import { Module } from '@nestjs/common';
import { LoggerService } from '@modules/logger/logger.service';
import { InsuranceService } from './insurance.service';
import { InsuranceController } from './insurance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Insurance, InsuranceSchema } from '@schema';
import { BinanceService } from '@modules/binance/binance.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Insurance.name, schema: InsuranceSchema },
    ]),
  ],
  controllers: [InsuranceController],
  providers: [InsuranceService, LoggerService, BinanceService],
})
export class InsuranceModule {}
