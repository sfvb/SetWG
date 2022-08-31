import { DataSource } from 'typeorm';

const ORMConfig = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'setwg',
  synchronize: true,
  logging: true,
  subscribers: [],
  migrations: ['dist/src/db/migrations/**/*.js'],
});

export default ORMConfig;