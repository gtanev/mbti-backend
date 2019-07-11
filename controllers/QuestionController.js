import Question from '../models/Question';

export default class QuestionController {
  static getAllQuestions = (req, res) => {
    Question.findAll()
        .then(questions => res.status(200).json({ questions }))
        .catch(error => res.status(500).json({ error }));
  };
}