import { Injectable } from '@nestjs/common';
import Binance from 'node-binance-api';
import { OrderFuturesDto } from './binance.dto';
import { LoggerService } from '@modules/logger/logger.service';
import env from '@utils/constant/env';

@Injectable()
export class BinanceService {
  private binance: Binance;
  constructor() {
    this.binance = new Binance().options({
      APIKEY: env.BINANCE_API_KEY,
      APISECRET: env.BINANCE_SECRET_KEY,
      test: true,
    });
  }

  public async getPriceFutures() {
    try {
      return await this.binance.futuresPrices();
    } catch (error) {
      console.error(error);
    }
  }

  public async OrderFuturesBinance(props: OrderFuturesDto) {
    const { side, symbol, value, p_stop, p_claim } = props;
    console.log(props);

    let lm: any;

    try {
      // limt
      if (side === 'SELL') {
        lm = await this.binance.futuresMarketBuy(symbol, value);
      } else {
        lm = await this.binance.futuresMarketSell(symbol, value);
      }

      // take profit
      const tp = await this.binance.futuresOrder(side, symbol, value, false, {
        type: 'TAKE_PROFIT_MARKET',
        stopPrice: p_claim,
      });

      // stoploss
      const sl = await this.binance.futuresOrder(side, symbol, value, false, {
        type: 'STOP_MARKET',
        stopPrice: p_stop,
      });

      return { tp, sl, lm };
    } catch (error) {
      LoggerService.error(error);
      return {};
    }
  }
}
