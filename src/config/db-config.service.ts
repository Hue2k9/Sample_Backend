import { Logger } from '@nestjs/common';
const logger = new Logger('Configuration');
export const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    logger.warn(`${key} not found`);
  }
  return value;
};

// export const dbConfig = {
//   host: encodeURI(getEnv('DB_HOST')),
//   port: parseInt(getEnv('DB_PORT'), 10),
//   username: getEnv('DB_USER'),
//   password: getEnv('DB_PASSWORD'),
//   name: getEnv('DB_NAME'),
// };
// export const dbConfig = {
//   uri: `mongodb://${getEnv('DB_USER')}:${getEnv('DB_PASSWORD')}@${getEnv(
//     'DB_HOST',
//   )}:${getEnv('DB_PORT')}/${getEnv('DB_NAME')}`,
// };
export const dbConfig = {
  uri: `mongodb://localhost:27017/post-interaction`,
};
