import { User } from '../utils/types';
import { UserModel } from '../models/user';
import * as mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

const createUser = (user: User): Promise<User> => UserModel.create(user);

const saveToken = (userId: string | undefined, refreshToken: string) =>
  UserModel.findOneAndUpdate(
    { _id: new ObjectId(userId) },
    {
      $set: { refreshToken },
    },
    { projection: { password: 0 } }
  );

const findUserByEmail = (email: string) => UserModel.find({ email: email });

const findUserById = (id: string) => UserModel.find({ _id: id });

export { createUser, saveToken, findUserByEmail, findUserById };
