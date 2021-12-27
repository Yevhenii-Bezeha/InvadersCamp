import app from '../src/app';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';

dotenv.config();
const uriDb: string = process.env['DB_HOST'] || 'error';

const mongooseOptions = {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connect = (): void => {
  mongoose
    .connect(uriDb, mongooseOptions)
    .then(() => {
      const PORT: string = process.env['PORT'] || '3000';
      app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

      console.log('DB successfully connected');
    })
    .catch((error) => {
      console.log('Error connecting to database');
    });
};
connect();
