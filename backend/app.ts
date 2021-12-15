import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as cors


const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('dist/appName')));

// app.use('*', (req: any, res: any, next: any) => {
//   res.sendFile(path.resolve('dist/appName/index.html'));
//   next();
// });

app.get('/posts', (req: express.Request, res: any) => {
  // res.sendFile(path.resolve('dist/appName/index.html'));
  res.json('respond');
  console.log('-----------------------posts');
});

app.use((req: any, res: any) => {
  res.status(404).json({message: 'Not found'});
});

app.use((err: any, req: any, res: any, next: any) => {
  const {status = 500, message = 'Server error'} = err;
  res.status(status).json(message);
});

app.listen(3000, () => console.log('server started'));
