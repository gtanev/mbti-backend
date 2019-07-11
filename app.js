import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import { initDB, fillDB } from './persistence/db';
import { sequelise } from './persistence/db';
import indexRouter from './routes/index';
import questionsRouter from './routes/questions';
import usersRouter from './routes/users';
import { registerPaths } from './controllers/IndexController';

require('./models/User');
require('./models/Dimension');
require('./models/Question');
require('./models/UserQuestion');

const app = express();

app.use(logger('dev'));
app.use(express.json({ type: '*/*' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/questions', questionsRouter);
app.use('/users', usersRouter);

app._router.stack.forEach(registerPaths.bind(null, []));

app.set('json spaces', 2);

initDB().then(() => sequelise.sync()).then(fillDB).catch(e => console.debug(e));

export default app;