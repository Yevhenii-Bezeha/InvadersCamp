import * as express from 'express';
import { Application, Request, Response } from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as cors from 'cors';
import errorMiddleware from './middlewares/errorMiddleware';
import db from './db';
import apiRouter from './api';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Blog API docs',
      description: 'API documentation for Blog project',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['dist/server/src/api/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

dotenv.config();
const PORT: string = process.env['PORT'] || '3000';

const app: Application = express();

const formatsLogger: 'dev' | 'short' =
  app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.resolve('dist/appName')));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
