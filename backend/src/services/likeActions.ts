import { Like } from '../utils/types';
import * as mongoose from 'mongoose';
import LikeModel from '../db/schemas/like';

const ObjectId = mongoose.Types.ObjectId;

const createLike = (like: Like): Promise<Like> => LikeModel.create(like);

const toggleLike = (likeId: string, isLiked: boolean) =>
  LikeModel.findOneAndUpdate(
    { _id: new ObjectId(likeId) },
    {
      $set: { isLiked: isLiked },
    }
  );

export { createLike, toggleLike };
