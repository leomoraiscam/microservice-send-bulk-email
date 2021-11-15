import mongoose, { Document, Schema } from 'mongoose';

export type ContactAttributes = {
  email: string;
  tags: string[];
};

export type ContactModel = Document & ContactAttributes;

const ContactSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ContactModel>('Contact', ContactSchema);
