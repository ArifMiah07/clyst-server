import { model, Schema } from 'mongoose';
import { PostModel, TPost } from './post/post.interface';

const postSchema = new Schema<TPost, PostModel>(
  {
    name: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    text: { type: String, required: true },
    imgUrl: { type: String, required: true },
    profileImage: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  },
);

// Create the model based on the schema
export const Post = model<TPost, PostModel>('Post', postSchema);
