import catchAsync from '../utils/catchAsync.js';
import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User.js';

import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Post from '../models/Post.js';

dotenv.config();

interface MongoError extends Error {
  code?: number;
}
declare module 'express' {
  interface Request {
    user?: IUser;
  }
}

const jwtSecret: string = process.env.JWT_SECRET as string;
if (!jwtSecret) {
  throw new Error('JWT Secret not provided');
}
const signToken = (id: string): string => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: '90d',
  });
};

const login = catchAsync(async (req: Request, res: Response) => {
  try {
    console.log('Request: ', req.body);
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials', success: false });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('User Found:', user);

    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid credentials', success: false });
      return;
    }
    const token = signToken(user._id.toString());
    res.cookie('token', token, {
      httpOnly: true,
    });
    res.json({
      message: 'Form data recieved successfully',
      userName: user.userName,
      token,
    });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
      messageBody: error instanceof Error ? error.message : error,
    });
  }
});
// const checkLogin = catchAsync()
const register = catchAsync(async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    console.log('Request: ', req.body);

    try {
      const user = await User.create({
        userName,
        password: hashedPass,
      });
      const token = signToken(user._id.toString());
      res.status(201).json({
        message: 'Register data recieved successfully',
        userName,
        password,
        user,
        token,
      });
      console.log(
        'Register data recieved successfully',
        userName,
        password,
        user,
        token,
      );
    } catch (error) {
      const mongoError = error as MongoError;
      if (mongoError.code === 11000) {
        res.status(400).json({ message: 'User already exists' });
      }
      res.status(500).json({ message: 'Internal server error' });
      console.error(mongoError);
    }
    res.json({
      message: 'Register data recieved successfully',
      userName,
      password,
    });
    console.log(`user:${userName}  password:${password}`);
  } catch (error: unknown) {
    console.error(error);
  }
});
const dashboard = catchAsync(async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();

    res.json({
      message: 'Dashboard data',
      posts,
    });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Get the token from the cookies
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        res
          .status(403)
          .json({ message: 'You are not logged in', success: false });
        return;
      }
      // Verify the token
      const decoded = jwt.verify(token, jwtSecret) as { id: string };
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        res.status(403).json({
          message: ' The user belonging to this token no longer exist',
          success: false,
        });
        return;
      }
      req.user = currentUser;

      next();
    } catch (error: unknown) {
      res.status(403).json({ message: 'Invalid token. Please Login' });
    }
  },
);

// Create new posts
const addPost = catchAsync(async (req: Request, res: Response) => {
  try {
    const posts = Post.find();
    res.json(200).json({
      posts,
    });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//Create new post
const createPost = catchAsync(async (req: Request, res: Response) => {
  try {
    const { title, body } = req.body;
    console.log('Title:', title);
    console.log('Title:', body);
    const newPost = await Post.create({ title, body });
    res.status(201).json({
      message: 'Post created successfully',
      post: newPost,
    });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
const editPost = catchAsync(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        body,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true },
    );

    if (!updatedPost) {
      res.status(404).json({ message: 'Post not found' });
    }
    res.status(201).json({
      message: 'Post created successfully',
      post: updatedPost,
    });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const deletePost = catchAsync(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const logout = catchAsync(async (req: Request, res: Response) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'strict',
    });

    res.status(200).json({ message: 'Logged out successfully', success: true });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const getUsers = catchAsync(async (req: Request, res: Response) => {
  try {
    const users = req.user;
    if (!users) {
      res.status(404).json({ message: 'User not found' });
    }
    // const users = await User.find().select('-password');
    res.status(200).json({ message: 'User fetched successfully', users });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export {
  login,
  register,
  protect,
  dashboard,
  addPost,
  createPost,
  editPost,
  deletePost,
  logout,
  getUsers,
};
