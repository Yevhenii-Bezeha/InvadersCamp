import * as jsonwebtoken from 'jsonwebtoken';
import * as dotenv from 'dotenv';

const SECRET_KEY: string = process.env['PORT'] || 'error';
dotenv.config();

export const createToken = (payload: { _id: string | undefined }) =>
  jsonwebtoken.sign(payload, SECRET_KEY, { expiresIn: '1h' });
