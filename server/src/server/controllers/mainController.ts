import Post from '../models/Post.js';
import catchAsync from '../utils/catchAsync.js';
import { Request, Response } from 'express';

const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  try {
    const locals = {
      title: 'Home HodeJS Blog',
      description: 'Simple node js blog',
    };
    const perPage: number = 10;
    const page: number =
      typeof req.query.page === 'string' ? parseInt(req.query.page) : 1;
    const posts = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count: number = await Post.countDocuments();
    const nextPage: number = page + 1;
    const hasNextpage: boolean = nextPage <= Math.ceil(count / perPage);
    res.json({
      posts,
      locals,
      currentPage: page,
      nextPage: hasNextpage ? nextPage : null,
    });
  } catch (error: unknown) {
    console.error(error);
  }
});

const getPostById = catchAsync(async (req: Request, res: Response) => {
  try {
    const slug = req.params.id;

    const posts = await Post.findById({ _id: slug });
    const locals = {
      title: 'Home HodeJS Blog',
      description: 'Simple node js blog',
    };

    res.json({
      posts,
      locals,
    });
  } catch (error: unknown) {
    console.error(error);
  }
});
const searchPosts = catchAsync(async (req: any, res: any) => {
  try {
    const { search } = req.body;

    if (!search || typeof search !== 'string') {
      return res.status(400).json({ message: 'Search term must be a string.' });
    }

    const posts = await Post.find({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { body: { $regex: search, $options: 'i' } },
      ],
    });
    res.json({
      posts,
    });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { getAllPosts, getPostById, searchPosts };
