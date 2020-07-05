// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

// Set default to "development"
const nodeEnv = process.env.ENV_FILE || 'development';
const result2 = dotenv.config({
  path: `./env/.env.${nodeEnv}`
});

if (result2.error) {
  throw result2.error;
}
