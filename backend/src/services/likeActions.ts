import { ILike } from '../models/IPost';
import * as mongoose from 'mongoose';
import Like from '../db/schemas/like';

const ObjectId = mongoose.Types.ObjectId;

const createLike = (like: ILike): Promise<ILike> => Like.create(like);

const toggleLike = (likeId: string, isLiked: boolean) =>
  Like.findOneAndUpdate(
    { _id: new ObjectId(likeId) },
    {
      $set: { isLiked: isLiked },
    }
  );

export { createLike, toggleLike };
