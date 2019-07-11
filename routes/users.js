import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

router.get('/', UserController.getAllUsers);

router.get('/findOne', UserController.getUser);

router.post('/', UserController.createOrUpdateUser);

export default router;