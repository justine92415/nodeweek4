import Post from '../models/postModel';
import '../models/userModel';
import handleSuccess from '../service/handleSuccess';
import handleError from '../service/handleError';
import { IPost } from '../type';
import { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';

const posts = {
  async getPosts(req: Request, res: Response) {
    const timeSort = req.query.timeSort === 'asc' ? 'createdAt' : '-createdAt';
    const q: FilterQuery<IPost> = {
      content: { $regex: req.query.q || '', $options: 'i' },
    };
    const posts = await Post.find(q)
      .populate({
        path: 'user',
        select: 'name photo',
      })
      .sort(timeSort);
    handleSuccess(res, posts);
  },
  async createPost(req: Request, res: Response) {
    try {
      const { body } = req;
      const random = Math.floor(Math.random() * 1000);
      if (!!body.content) {
        const newPost = await Post.create<IPost>({
          user: body.user || '6624c98b3825a53f4d8a5506',
          content: body.content,
          image: body.image || `https://picsum.photos/${random}/${random}`,
        });
        handleSuccess(res, newPost);
      } else {
        const error = new Error('');
        handleError(res, error);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        handleError(res, error);
      }
    }
  },
  async deletePost(req: Request, res: Response) {
    const id = req.url?.split('/').pop()!;
    await Post.findByIdAndDelete(id);
    handleSuccess(res, null);
  },
  async deleteAllPosts(req: Request, res: Response) {
    await Post.deleteMany({});
    handleSuccess(res, null);
  },
  async updatePost(req: Request, res: Response) {
    const id = req.url?.split('/').pop()!;
    const { body } = req;
    const posts = await Post.findByIdAndUpdate(id, body, { new: true });
    handleSuccess(res, posts);
  },
};

export default posts;
