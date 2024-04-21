import mongoose from "mongoose";

export interface IPost {
  content: string;
  image?: string;
  createdAt?: Date;
  user: typeof mongoose.Schema.ObjectId;
  likes?: number;
}

export interface IUser {
  name: string;
  email: string;
  photo: string;
}