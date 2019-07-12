import User from '../models/User';
import UserQuestion from '../models/UserQuestion';
import Question from '../models/Question';

export default class UserController {

  static getAllUsers = async (req, res) => {
    try {
      User.hasMany(UserQuestion, { foreignKey: 'userId' });
      UserQuestion.belongsTo(User, { foreignKey: 'userId' });

      let users = await User.findAll({ include: [UserQuestion] });

      res.status(200).json({ users });
    }
    catch (error) {
      console.debug(error);
      res.status(500).json({ error });
    }
  };

  static getUser = async (req, res) => {
    const { id: userId, email: userEmail } = req.query;
    let userDetails;

    try {
      User.hasMany(UserQuestion, { foreignKey: 'userId' });
      UserQuestion.belongsTo(User, { foreignKey: 'userId' });

      if (userId) {
        userDetails = await User.findOne({ where: { id: userId }, include: [UserQuestion] });
      } else if (userEmail) {
        userDetails = await User.findOne({ where: { email: userEmail }, include: [UserQuestion] });
      }

      res.status(200).json(userDetails ? userDetails : { 'message': 'User not found.' });
    }
    catch (error) {
      console.debug(error);
      res.status(500).json({ error });
    }
  };

  static createOrUpdateUser = async (req, res) => {
    const { email, answers } = req.body;

    try {
      let user = await User.findOne({ where: { email: email } });
      if (!user) user = await User.create({ email: email });

      let [rankings, ignored] = await Promise.all(
          [createReport(answers), updateUserQuestions(answers, user)]
      );

      const [acronym, alternatives] = inferMyersBriggsType(rankings);

      if (user.mbti !== acronym) {
        await User.update({ ...user, mbti: acronym }, { where: { id: user.id } });
      }

      let body = {
        type: acronym,
        dimensions: mapToObject(rankings),
        alternatives: alternatives.length ? alternatives : null,
      };

      res.status(200).json(body);
    }
    catch (error) {
      console.debug({ error });
      res.status(500).json({ error });
    }
  };
}

const updateUserQuestions = async (answers, user) => {
  for (let a of answers) {
    a = { ...a, userId: user.id };
    const existingAnswer = await UserQuestion.findOne({
      where: { userId: user.id, questionId: a.questionId }
    });
    if (!existingAnswer) {
      await UserQuestion.create(a);
    } else if (existingAnswer.answer !== a.answer) {
      await UserQuestion.update(a, { where: { userId: user.id, questionId: a.questionId } });
    }
  }
};

const createReport = async (answers) => {
  let questions = await Question.findAll();
  let rankings = new Map();

  for (const a of answers) {
    const question = questions.find(q => q['id'] === a['questionId']);
    const key = question['dimension'];
    const value = !question['direction'] ? reverseNumber(a['answer']) : a['answer'];
    rankings.set(key, rankings.has(key)
        ? [rankings.get(key)[0] + value, rankings.get(key)[1] + 1]
        : [value, 1]);
  }

  rankings.forEach((value, key, map) => map.set(key, roundNumber(value[0] / value[1])));

  return rankings;
};

const minScore = 1, maxScore = 7;
const roundNumber = n => Math.round(n * 100) / 100;
const reverseNumber = (n, min = 1, max = 7) => (min + max) - n;

const inferMyersBriggsType = (rankings, midPoint = (minScore + maxScore) / 2) => {
  let type = '', alternatives = [];

  rankings.forEach((value, key) => type += (value > midPoint) ? key.charAt(1) : key.charAt(0));

  [...rankings.entries()].forEach((entry, index) => {
        if (entry[1] === midPoint) {
          alternatives.push(type.replace(type.charAt(index), entry[0].charAt(1)));
        }
      }
  );

  return [type, alternatives];
};

const mapToObject = m => {
  const object = {};

  m.forEach((value, key) => object[key] = value);

  return object;
};