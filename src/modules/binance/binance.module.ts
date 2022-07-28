import { Module } from '@nestjs/common';
import { LoggerService } from '@modules/logger/logger.service';
import { BinanceController } from './binance.controller';
import { BinanceService } from './binance.service';

@Module({
  imports: [],
  controllers: [BinanceController],
  providers: [BinanceService, LoggerService],
})
export class BinanceModule {}
