import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

export enum Environment {
  PRODUCTION = 'production',
  STAGING = 'staging',
  DEVELOPMENT = 'development',
}

const logger = new Logger('Configuration');

export const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    logger.warn(`${key} not found`);
  }
  return value;
};

export interface Configuration {
  env: Environment;
  server: {
    port: number;
    address: string;
  };
  database: {
    host: string;
    port: number;
    name: string;
  };
  jwt: {
    secret: string;
    exp: number;
  };
  defaultPassword: string;
  swagger: string;
  corsOrigins: string[] | string;
}

export default (): Configuration => {
  // Environment
  const env = getEnv('NODE_ENV') as Environment;

  // Server
  const serverPort = parseInt(getEnv('SERVER_PORT'), 10) || 3000;
  const serverAddress =
    getEnv('SERVER_ADDRESS') || `http://localhost:${serverPort}`;

  // Database
  const databaseHost = encodeURI(getEnv('DB_HOST'));
  const databasePort = parseInt(getEnv('DB_PORT'), 10);
  const databaseName = getEnv('DB_NAME');

  // JWT
  const jwtSecret = getEnv('JWT_SECRET');
  const jwtExp = getEnv('JWT_EXP');

  const swagger = getEnv('SWAGGER_API');
  const defaultPassword = getEnv('DEFAULT_PASSWORD');

  // ESMS
  const corsOrigins = getEnv('CORS_ORIGINS')
    ? JSON.parse(getEnv('CORS_ORIGINS'))
    : '*';
  return {
    env,
    server: {
      port: serverPort,
      address: serverAddress,
    },
    database: {
      host: databaseHost,
      port: databasePort,
      name: databaseName,
    },
    jwt: {
      secret: jwtSecret,
      exp: jwtExp && parseInt(jwtExp, 10),
    },
    defaultPassword,
    swagger,
    corsOrigins,
  };
};
