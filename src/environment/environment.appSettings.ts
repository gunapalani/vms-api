require('dotenv').config();

const B2C_TENANT_NAME = process.env.B2C_TENANT_NAME;
const B2C_CLIENT_ID = process.env.B2C_CLIENT_ID;
const B2C_POLICY_NAME = process.env.B2C_POLICY_NAME;
const B2C_TENANT_ID = process.env.B2C_TENANT_ID;
const B2C_CLIENT_SECRET = process.env.B2C_CLIENT_SECRET;
const B2C_EXTENSION_ID = process.env.B2C_EXTENSION_ID;
const B2C_PASSWORD_POLICY = process.env.B2C_PASSWORD_POLICY;
const B2C_PASSWORD = process.env.B2C_PASSWORD;
const B2C_DOMAIN = process.env.B2C_DOMAIN;
const GRANT_TYPE = process.env.GRANT_TYPE;
const SCOPE = process.env.SCOPE;
const TOKEN_ENDPOINT = process.env.TOKEN_ENDPOINT;

export const CONFIG = {
  DB_CONNECTION: process.env.DB_CONNECTION,
  AZURE_STORAGE_ACCOUNT: process.env.AZURE_STORAGE_ACCOUNT,
  AZURE_STORAGE_ACCESS_KEY: process.env.AZURE_STORAGE_ACCESS_KEY,
  PORT: process.env.PORT,
  SECRET_KEY: process.env.SECRET_KEY,
  TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN,
  LOG_DIR: process.env.LOG_DIR,
  LOG_FORMAT: process.env.LOG_FORMAT,
  ORIGIN: process.env.ORIGIN,
  CREDENTIALS: process.env.CREDENTIALS === 'true',
  NODE_ENV: process.env.NODE_ENV,
  ACCESS_TOKEN_SECRET_KEY: process.env.secret,
  Refresh_TOKEN_SECRET_KEY: process.env.refreshTokenSecret,
  TOKEN_LIFE: process.env.tokenLife,
  REFRESH_TOKEN_LIFE: process.env.refreshTokenLife,
  AZURE_STORAGE_CONNECTION_STRING: process.env.AZURE_STORAGE_CONNECTION_STRING,
  AZURE_STORAGE_EVENT_QUEUE_NAME: process.env.AZURE_STORAGE_EVENT_QUEUE_NAME,
  REDIS_CACHE_HOSTNAME: process.env.REDIS_CACHE_HOSTNAME,
  REDIS_PARTITION_KEY: process.env.REDIS_PARTITION_KEY,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_CACHE_PASSWORD: process.env.REDIS_CACHE_PASSWORD,
  APPLICATIONINSIGHTS_CONNECTION_STRING: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
  B2C_EXTENSION_ID: B2C_EXTENSION_ID,
  B2C_CLIENT_ID: B2C_CLIENT_ID,
  B2C_CLIENT_SECRET: B2C_CLIENT_SECRET,
  B2C_PASSWORD_POLICY: B2C_PASSWORD_POLICY,
  B2C_PASSWORD: B2C_PASSWORD,
  B2C_DOMAIN: B2C_DOMAIN,
  GRANT_TYPE: GRANT_TYPE,
  SCOPE: SCOPE,
  TOKEN_ENDPOINT: TOKEN_ENDPOINT,
  B2C_TENANT_NAME: B2C_TENANT_NAME,
  b2cOptions: {
    identityMetadata: `https://${B2C_TENANT_NAME}.b2clogin.com/${B2C_TENANT_NAME}.onmicrosoft.com/B2C_1A_PH_SUSI/v2.0/.well-known/openid-configuration`,
    clientID: B2C_CLIENT_ID,
    audience: B2C_CLIENT_ID,
    policyName: B2C_POLICY_NAME,
    isB2C: true,
    validateIssuer: false,
    loggingLevel: 'info',
    passReqToCallback: false,
  },
  msalConfig: {
    auth: {
      clientId: B2C_CLIENT_ID,
      authority: `https://login.microsoftonline.com/${B2C_TENANT_ID}`,
      clientSecret: B2C_CLIENT_SECRET,
    },
  },
  tokenRequest: {
    scopes: ['https://graph.microsoft.com/.default'],
  },
  REDEMPTION_API_ENDPOINT: process.env.REDEMPTION_API_ENDPOINT,
  SEED_APPLICATIONUSER_ROLEID: process.env.SEED_APPLICATIONUSER_ROLEID,
};
