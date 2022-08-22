import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: +5432,
  username: 'admin',
  password: 'admin',
  database: 'setwg',
  entities: ['dist/src/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/src/db/migrations/**/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

export default config;
