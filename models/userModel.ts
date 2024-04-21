import mongoose from 'mongoose';
import { IUser } from '../type';

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, '請輸入您的名字'],
  },
  email: {
    type: String,
    required: [true, '請輸入您的 Email'],
    unique: true,
    lowercase: true,
    select: false,
  },
  photo: String,
});
const User = mongoose.model<IUser>('user', userSchema);

export default User;
