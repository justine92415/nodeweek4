import { Types } from 'mongoose';

export interface IPost {
  content: string;
  image?: string;
  createdAt?: Date;
  user: Types.ObjectId;
  likes?: number;
}

export interface IUser {
  name: string;
  email: string;
  photo: string;
}
