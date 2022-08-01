import { Controller, Get } from '@nestjs/common';
import { BinanceService } from './binance.service';

@Controller()
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) {}

  @Get('get-futures-price')
  async getPriceFutures() {
    return this.binanceService.getPriceFutures();
  }
}
