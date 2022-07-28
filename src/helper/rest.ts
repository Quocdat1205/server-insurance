import Axios from 'axios';
import env from '@utils/constant/env';
import { GetPriceTokenDto } from 'src/type/rest.type';

export const fetcher = Axios.create({ baseURL: env.END_POINT_NAMI });

export const options = {
  headers: {
    'Content-Type': 'application/json',
    fakeauthorization: 18,
  },
};

export const fetchPrice = async (props: GetPriceTokenDto) => {
  const { symbol } = props;

  const { data } = await fetcher.get(
    `/api/v3/spot/market_watch?symbol=${symbol}`,
  );

  return data;
};
