import { sequelise } from '../persistence/db';
import * as Sequelize from 'sequelize';

export default class UserQuestion extends Sequelize.Model {}

UserQuestion.init({
  answer: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    unique: 'compositeIndex',
    primaryKey: true,
  },
  questionId: {
    type: Sequelize.INTEGER,
    unique: 'compositeIndex',
    primaryKey: true,
  },
}, {
  sequelize: sequelise,
  timestamps: true,
  freezeTableName: true,
  version: false,
  modelName: 'user_question',
});