import mongoose from 'mongoose';
import { IPost } from '../type';


const postSchema = new mongoose.Schema<IPost>(
  {
    content: {
      type: String,
      required: [true, 'Content 未填寫'],
    },
    image: {
      type: String,
      default: '',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      required: [true, '貼文姓名未填寫'],
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false }
);
const Post = mongoose.model<IPost>('post', postSchema);

export default Post;
