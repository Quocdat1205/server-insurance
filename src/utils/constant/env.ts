import * as dotenv from 'dotenv';
dotenv.config();

const env: { [key: string]: any } = {};

define('NODE_ENV', process.env.NODE_ENV);
define('MONGO_URL', process.env.MONGO_URL);
define('PORT', process.env.PORT);
define('isProduction', process.env.NODE_ENV === 'production');
define('PRIVATE_KEY', process.env.PRIVATE_KEY);
define('JWT_SECRET_KEY', process.env.JWT_SECRET_KEY);
define('REDIS_PORT', process.env.REDIS_PORT);
define('REDIS_HOST', process.env.REDIS_HOST);
define('END_POINT_NAMI', process.env.END_POINT_NAMI);
define('CHAIN_ID', process.env.CHAIN_ID);
define('RCP_URL', process.env.RCP_URL);
define('BINANCE_API_KEY', process.env.BINANCE_API_KEY);
define('BINANCE_SECRET_KEY', process.env.BINANCE_SECRET_KEY);
define('CONTRACT_ADDRESS_PANCAKE', process.env.CONTRACT_ADDRESS_PANCAKE);
define('CONTRACT_ADDRESS_NAIN', process.env.CONTRACT_ADDRESS_NAIN);
define('CONTRACT_ADDRESS_INSURANCE', process.env.CONTRACT_ADDRESS_INSURANCE);
define('BLOCK_TIME_SC', process.env.BLOCK_TIME_SC);
define('TIME_SCHEDULE', 5); // 5 minutes

function define(key: string, value: any) {
  Object.defineProperty(env, key, {
    value,
    enumerable: true,
  });
}

export default env;
