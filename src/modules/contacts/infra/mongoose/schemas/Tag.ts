import mongoose, { Document, Schema } from 'mongoose';

type TagAttributes = {
  title: string;
};

export type TagModel = Document & TagAttributes;

const TagSchema = new Schema(
  {
    title: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<TagModel>('Tag', TagSchema);
