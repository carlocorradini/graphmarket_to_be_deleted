import envalid, { str, port, bool, url, num } from 'envalid';

/**
 * One week in seconds
 */
const ONE_WEEK_IN_SECONDS: number = 60 * 60 * 24 * 7;

/**
 * Environment variables sanitized and immutable.
 */
const env = envalid.cleanEnv(
  process.env,
  {
    NODE_ENV: str({ default: 'production', choices: ['production', 'development', 'test'] }),
    PORT: port({ devDefault: 8080 }),
    DATABASE_URL: url(),
    DATABASE_SSL: bool({ default: true, devDefault: false }),
    DATABASE_SYNCHRONIZE: bool({ default: false, devDefault: true }),
    DATABASE_LOGGING: bool({ default: false }),
    REDIS_URL: url(),
    REDIS_JWT_BLOCKLIST: str({ default: 'JWT_BLOCKLIST' }),
    JWT_SECRET: str(),
    JWT_ALGORITHM: str({ default: 'HS256' }),
    JWT_EXPIRATION_TIME: num({ default: ONE_WEEK_IN_SECONDS }),
    GRAPHQL_PATH: str({ default: '/graphql' }),
    GRAPHQL_PLAYGROUND: bool({ default: false, devDefault: true }),
  },
  {
    strict: true,
  },
);

export default env;
