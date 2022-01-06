import { ITag } from '../models/IPost';
import * as mongoose from 'mongoose';
import Tag from '../db/schemas/tag';

const ObjectId = mongoose.Types.ObjectId;

const createTag = (tag: ITag): Promise<ITag> => Tag.create(tag);

const updateTag = (tagId: string, { text }: ITag) =>
  Tag.findOneAndUpdate(
    { _id: new ObjectId(tagId) },
    {
      $set: { text },
    }
  );

const removeTag = (tagId: string) =>
  Tag.findByIdAndRemove({ _id: new ObjectId(tagId) });

export { createTag, updateTag, removeTag };
