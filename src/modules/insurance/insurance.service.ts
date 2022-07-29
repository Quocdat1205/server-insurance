import { Injectable } from '@nestjs/common';
import { Insurance, InsuranceType } from '@schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateInsuranceDto, GetInsuranceByIdDto } from './insurance.dto';
import { Lever, P_stop, coverPayout } from 'src/helper/handler';
import { fetchPrice } from 'src/helper/rest';
import { OrderFuturesDto } from '@modules/binance/binance.dto';
import { BinanceService } from '@modules/binance/binance.service';
import { GetInsuranceDto } from './insurance.dto';
import { EXPIRED, AVAILABLE } from '@utils/constant/stateInsurance';
import { CalCoverPayoutDto } from 'src/type/handler.type';
@Injectable()
export class InsuranceService {
  constructor(
    @InjectModel(Insurance.name)
    private readonly modelInsurance: Model<InsuranceType>,
    private readonly binanceService: BinanceService,
  ) {}

  public async createNewInsurance(props: CreateInsuranceDto) {
    const { p_start, p_claim, hedge } = props;

    const { value, p_stop } = await this.cmdBinanceFutures(props);

    const cover_payout = coverPayout({
      value,
      p_claim,
      p_start,
      hedge: hedge / 100,
    });

    return await new this.modelInsurance({
      ...props,
      owner: props.owner,
      state: AVAILABLE, // default available
      side: p_stop > p_start ? 'Buy' : 'Sell',
      isClaim: false,
      cover_payout,
    }).save();
  }

  private async cmdBinanceFutures(props: CreateInsuranceDto) {
    const { p_start, p_claim, hedge, escrow, asset } = props;

    const price_asset = await fetchPrice({ symbol: `${asset}USDT` });

    const price_bnb = await fetchPrice({ symbol: 'BNBUSDT' });

    const p_stop = P_stop({
      p_start: p_start,
      p_claim,
      hedge: hedge / 100,
    });

    const leverage = Lever({ p_start, p_stop });

    const swap_value = (escrow * price_bnb.data[0].p) / price_asset.data[0].p;

    const value_not_rounded = leverage * swap_value * 2;

    const value: OrderFuturesDto = {
      side: p_stop > p_start ? 'SELL' : 'BUY',
      symbol: `${asset}USDT`,
      value: Math.round(value_not_rounded * 100) / 100,
      price: p_start,
      p_stop: p_stop,
      p_claim: p_stop,
    };

    await this.binanceService.OrderFuturesBinance(value);

    return { value: value_not_rounded, p_stop };
  }

  public async getInsuranceByAddress(
    props: GetInsuranceDto,
  ): Promise<{ list_insurance: Insurance[]; count: number }> {
    const { owner, min, max, isAll } = props;

    if (isAll === true) {
      const list_insurance = await this.modelInsurance.find({
        owner,
      });

      const { length } = list_insurance;

      return { list_insurance, count: length };
    }

    const list_insurance = await this.modelInsurance
      .find({ owner })
      .skip(min)
      .limit(max + 1)
      .exec();

    const { length } = list_insurance;

    return { list_insurance, count: length };
  }

  public async getInsuranceRefundByAddress(
    props: GetInsuranceDto,
  ): Promise<{ list_insurance: Insurance[]; count: number }> {
    const { owner, min, max, isAll } = props;

    if (isAll === true) {
      const list_insurance = await this.modelInsurance.find({
        owner,
        state: EXPIRED,
      });

      const { length } = list_insurance;

      return { list_insurance, count: length };
    }

    const list_insurance = await this.modelInsurance
      .find({ owner, state: EXPIRED })
      .skip(min)
      .limit(max + 1)
      .exec();

    const { length } = list_insurance;

    return { list_insurance, count: length };
  }

  public async getInsuranceById(id: GetInsuranceByIdDto): Promise<Insurance> {
    const { _id } = id;

    const insurance = await this.modelInsurance.findOne({ _id }).exec();

    return insurance;
  }

  public async getCoverPayout(props: CalCoverPayoutDto) {
    return coverPayout(props);
  }
}
