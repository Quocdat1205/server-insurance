import { BigNumber, ethers } from 'ethers';
import {
  CalCoverPayoutDto,
  CalPStopDto,
  CalLevel,
} from 'src/type/handler.type';

export const etherToWei = (amount: number | string): BigNumber =>
  ethers.utils.parseEther(amount.toString());

export const weiToEther = (wei: string | BigNumber): number =>
  parseFloat(ethers.utils.formatEther(wei));

export const diifStopfutures = 0; // 0%

export const diffClaim = 0.05; // 5%

export const coverPayout = (props: CalCoverPayoutDto): number => {
  const { value, p_start, p_claim, hedge } = props;

  const p_stop = P_stop({ p_start, p_claim, hedge });

  const lever = Math.floor(p_start / Math.abs(p_start - p_stop));

  const ratioPredict = Math.abs(p_claim - p_start) / p_start;

  const userCapital = value;

  const systemCapital = userCapital;

  const hedgeCapital = userCapital + systemCapital;

  const profit = ratioPredict * hedgeCapital * lever;

  const totalReward = profit * (1 - diffClaim) + value;

  return totalReward;
};

export const Lever = (props: CalLevel): number => {
  const { p_start, p_stop } = props;

  const leverage = Math.floor(p_start / Math.abs(p_start - p_stop));

  return leverage < 1 ? 1 : leverage;
};

export const P_stop = (props: CalPStopDto): number => {
  const { p_start, p_claim, hedge } = props;

  const ratio_min_profit = Math.abs(p_claim - p_start) / p_start / 2;

  if (p_claim > p_start) {
    const p_stop =
      p_start - p_start * (hedge + ratio_min_profit - diifStopfutures);

    return Math.abs(p_stop);
  } else {
    const p_stop =
      p_start + p_start * (hedge + ratio_min_profit - diifStopfutures);

    return Math.abs(p_stop);
  }
};

export const formatPriceToWeiValue = (_num: number): bigint => {
  return BigInt(_num * 10 ** 18);
};

export const randomNonce = (): number => {
  return Math.floor(Math.random() * 899999 + 100000);
};
