import { User } from '../utils/types';
import { UserModel } from '../models/user';
import * as mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

const createUser = (user: User): Promise<User> => UserModel.create(user);

const saveToken = (userId: string | undefined, token: string) =>
  UserModel.findOneAndUpdate(
    { _id: new ObjectId(userId) },
    {
      $set: { token },
    },
    { projection: { password: 0 } }
  );

const findUser = (email: string) => UserModel.find({ email: email });

export { createUser, saveToken, findUser };
