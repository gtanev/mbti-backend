import { Sequelize } from 'sequelize';
import config from '../config';
import fs from 'fs';

const { host, database, dialect, username, password, logging } = config.development;

export const initDB = async () => {
  await new Sequelize('', username, password, { host: host, dialect: dialect })
      .query(`CREATE DATABASE IF NOT EXISTS ${database};`);
};

export const fillDB = () => {
  fs.readFile('./resources/init-data.sql', 'utf8', async (err, contents) => {
    await sequelise.query(contents, { logging: logging });
  });
};

export const sequelise = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  logging: logging,
  dialectOptions: { multipleStatements: true }
});