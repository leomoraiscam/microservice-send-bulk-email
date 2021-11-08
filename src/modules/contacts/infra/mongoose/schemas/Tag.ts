import mongoose, { Document, Schema } from 'mongoose';

type Tag = Document & {
  title: string;
};

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

export default mongoose.model<Tag>('Tag', TagSchema);
