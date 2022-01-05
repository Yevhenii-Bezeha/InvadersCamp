import { Like } from '../models/types';
import * as mongoose from 'mongoose';
import LikeSch from '../db/schemas/like';

const ObjectId = mongoose.Types.ObjectId;

const createLike = (like: Like): Promise<Like> => LikeSch.create(like);

const toggleLike = (likeId: string, isLiked: boolean) =>
  LikeSch.findOneAndUpdate(
    { _id: new ObjectId(likeId) },
    {
      $set: { isLiked: isLiked },
    }
  );

export { createLike, toggleLike };
