const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(5000),
    DB_USERNAME: Joi.string().required().description('Db username'),
    DB_PASSWORD: Joi.string().required().description('Db password'),
    DB_DATABASE: Joi.string().required().description('Db name'),
    HOST: Joi.string().default('localhost'),
    DIALECT: Joi.string().default('postgres'),
    pool: {
      max: Joi.number().default(5),
      min: Joi.number().default(0),
      acquire: Joi.number().default(3000),
      idle: Joi.number().default(1000),
    },
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  postgres: {
    HOST: envVars.HOST,
    User: envVars.DB_USERNAME,
    PWD: envVars.DB_PASSWORD,
    DB: envVars.DB_DATABASE,
    dialect: 'postgres',
    pool: { ...envVars.pool },
  },
};
