import * as jsonwebtoken from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Unauthorized } from 'http-errors';

const JWT_SECRET_KEY: string = process.env['JWT_SECRET_KEY'] || 'error';

dotenv.config();

export const createAccessToken = (payload: { _id: string | undefined }) =>
  jsonwebtoken.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });

export const createRefreshToken = (payload: { _id: string | undefined }) =>
  jsonwebtoken.sign(payload, JWT_SECRET_KEY, { expiresIn: '30d' });

export const verifyToken = (token: string) => {
  try {
    const payload = jsonwebtoken.verify(token, JWT_SECRET_KEY);
    const userIdArr = Object.entries(payload)[0];
    return userIdArr[1];
  } catch (error: any) {
    throw new Unauthorized('Not authorized');
  }
};
