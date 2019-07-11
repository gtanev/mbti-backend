import { sequelise } from '../persistence/db';
import * as Sequelize from 'sequelize';

export default class Dimension extends Sequelize.Model {}

Dimension.init({
  dichotomy: {
    type: Sequelize.STRING(2),
    allowNull: false,
    unique: true,
  },
  description: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('NOW()'),
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('NOW()'),
  }
}, {
  sequelize: sequelise,
  timestamps: true,
  freezeTableName: true,
  version: false,
  modelName: 'dimension',
});