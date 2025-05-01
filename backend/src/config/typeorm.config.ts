import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config()

let extraOptions = {};
try {
  if (process.env['PGADDITIONALPARAMS']) {
    extraOptions = JSON.parse(process.env['PGADDITIONALPARAMS']);
  }
} catch (e) {
  console.error('Error with parsing PGADDITIONALPARAMS:', e);
}

console.log(
  'Entity paths:',
  `${__dirname}/../../../database/entities/**/*.entity{.ts,.js}`,
);

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env['PGHOST'],
  port: parseInt(process.env['PGPORT'] || '') || 5432,
  username: process.env['PGUSER'],
  password: process.env['PGPASSWORD'],
  database: process.env['PGDATABASE'],
  poolSize: process.env['PGPOOLSIZE']
    ? parseInt(process.env['PGPOOLSIZE'])
    : undefined,
  connectTimeoutMS: process.env['PGPOOLCONNECTIONTIMEOUT']
    ? parseInt(process.env['PGPOOLCONNECTIONTIMEOUT'])
    : undefined,
  extra: extraOptions,
  logging: false,
  synchronize: false,
  entities: [`database/entities/**/*.entity.{ts,js}`],
  migrations: [`database/migrations/*.{ts,js}`],
};


export default new DataSource(typeOrmConfig);