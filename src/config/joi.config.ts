import Joi from 'joi';

const validationEnv = {
  PORT: Joi.number().default(4000),
  MONGO_URL: Joi.string().required(),
  REDIS_PORT: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  CONTRACT_ADDRESS: Joi.string().required(),
  PRIVATE_KEY: Joi.string().required(),
  CONTRACT_ADDRESS_NAIN: Joi.string().required(),
  BINANCE_API_KEY: Joi.string().required(),
  BINANCE_SECRET_KEY: Joi.string().required(),
};

export default validationEnv;
