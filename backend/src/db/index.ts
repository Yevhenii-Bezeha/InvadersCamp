import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';

dotenv.config();
const uriDb: string = process.env['DB_HOST'] || 'error';

const mongooseOptions = {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const initConnection = async () =>
  await mongoose
    .connect(uriDb, mongooseOptions)
    .then(() => {
      console.log('Successfully connected to database');
    })
    .catch((error) => {
      console.log('database connection failed. exiting now...', error);
      process.exit(1);
    });

const disconnect = async () => {
  await mongoose.disconnect();
  console.log('connection closed successfully');
};

export default { initConnection, disconnect };
