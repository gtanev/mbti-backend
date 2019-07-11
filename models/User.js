import * as Sequelize from 'sequelize';
import { sequelise } from '../persistence/db';

const emailRegex = new RegExp(
    '[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?');

export default class User extends Sequelize.Model {}

User.init({
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  mbti: {
    type: Sequelize.STRING,
  }
}, {
  sequelize: sequelise,
  timestamps: true,
  freezeTableName: true,
  version: false,
  modelName: 'user',
});

User.beforeCreate(user => {
  if (!emailRegex.test(user['email'])) {
    throw new Error('Invalid email address received!');
  }
});