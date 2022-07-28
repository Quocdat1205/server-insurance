import { Controller, Get } from '@nestjs/common';
import { BinanceService } from './binance.service';

@Controller()
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) {}

  @Get('get-price-futures')
  async getPriceFutures() {
    return this.binanceService.getPriceFutures();
  }
}
