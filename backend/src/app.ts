import * as express from 'express';
import { Application, Request, Response } from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as cors from 'cors';
import errorMiddleware from './middlewares/errorMiddleware';
import db from './db';
import apiRouter from './api';

const PORT: string = process.env['PORT'] || '3000';

const app: Application = express();

const formatsLogger: 'dev' | 'short' =
  app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve('dist/appName')));

app.use('/api', apiRouter);

app.use('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve('dist/appName/index.html'));
});

app.use(errorMiddleware);

const connect = async () => {
  await db.initConnection();
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
};

connect();
