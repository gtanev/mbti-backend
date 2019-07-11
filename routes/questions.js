import express from 'express';
import QuestionController from '../controllers/QuestionController';

const router = express.Router();

router.get('/', QuestionController.getAllQuestions);

export default router;