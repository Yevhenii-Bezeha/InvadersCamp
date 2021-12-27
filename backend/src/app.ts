import * as express from 'express';
import { Application, Request, Response } from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as cors from 'cors';
import postApi from './api/postApi';
import errorMiddleware from './middlewares/errorMiddleware';
import commentApi from './api/commentApi';
import likeApi from './api/likeApi';

const app: Application = express();

const formatsLogger: 'dev' | 'short' =
  app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('dist/appName')));

app.use('/posts', postApi);
app.use('/posts', likeApi);
app.use('/posts/:id/comments', commentApi);

app.use('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve('dist/appName/index.html'));
});

app.use(errorMiddleware);

export default app;
