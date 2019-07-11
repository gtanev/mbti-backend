import { sequelise } from '../persistence/db';
import * as Sequelize from 'sequelize';
import Dimension from './Dimension';

export default class Question extends Sequelize.Model {
  get dimensionValue() {
    return this.direction ? this.dimension.charAt(1) : this.dimension.charAt(0);
  }
}

Question.init({
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dimension: {
    type: Sequelize.STRING(2),
    allowNull: false,
    references: {
      model: Dimension,
      key: 'dichotomy',
    }
  },
  direction: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
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
  modelName: 'question',
});