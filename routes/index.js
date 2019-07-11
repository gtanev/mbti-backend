import express from 'express';
import IndexController from '../controllers/IndexController';

const router = express.Router();

router.get('/', IndexController.getRegisteredEndpoints);

export default router;