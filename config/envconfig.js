import dotenv from 'dotenv'

dotenv.config()
const {
  CLIENT_SECRET,
  DIALECT,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  TEST_DIALECT,
  TEST_DATABASE_HOST,
  TEST_DATABASE_NAME,
  TEST_DATABASE_PASSWORD,
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT
} = process.env

export default {
  development: {
    name: DATABASE_NAME,
    username: DATABASE_USERNAME,
    host: DATABASE_HOST,
    password: DATABASE_PASSWORD,
    dialect: DIALECT
  },

  test: {
    dbName: TEST_DATABASE_NAME,
    host: TEST_DATABASE_HOST,
    password: TEST_DATABASE_PASSWORD,
    dialect: TEST_DIALECT
  },
  production: {
    name: DATABASE_NAME,
    username: DATABASE_USERNAME,
    host: DATABASE_HOST,
    password: DATABASE_PASSWORD,
    dialect: DIALECT
  },
  appSecret: CLIENT_SECRET,

  redis: {
    host: REDIS_HOST || '127.0.0.1',
    password: REDIS_PASSWORD || '',
    port: REDIS_PORT || 6379

  }

}
