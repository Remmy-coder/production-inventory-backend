// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DataSource } = require('typeorm');

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
for (const envName of Object.keys(process.env)) {
  process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
}

const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ['dist/src/migrations/*.js'],
});

module.exports = {
  connectionSource,
};
