import express from 'express';
import { Request, Response } from 'express';
import Post from '../models/Post.js';
import {
  getAllPosts,
  getPostById,
  searchPosts,
} from '../controllers/mainController.js';

const router = express.Router();
router.get('/post', getAllPosts);
router.get('/post/:id', getPostById);
router.post('/search', searchPosts);

// search term
// const insertPostData = () => {
//   Post.insertMany([
//     {
//       title: 'Optimizing API performance in Express',
//       body: "Let's explore how to make our API faster and more efficient.",
//     },
//     {
//       title: 'Understanding Middleware in Express.js',
//       body: 'Middleware functions are at the core of Express applications.',
//     },
//     {
//       title: 'Why You Should Use TypeScript in Node.js',
//       body: 'TypeScript adds strong typing, which improves code quality.',
//     },
//     {
//       title: 'Deploying a Node.js App to Vercel',
//       body: 'Learn how to deploy a Node.js app step-by-step using Vercel.',
//     },
//     {
//       title: 'Handling Authentication with JWT in Node.js',
//       body: 'Secure your APIs using JSON Web Tokens (JWT) authentication.',
//     },
//     {
//       title: 'Using Mongoose for Database Operations',
//       body: 'Mongoose simplifies database interactions with MongoDB.',
//     },
//     {
//       title: 'Best Practices for Writing Clean Node.js Code',
//       body: 'Follow these coding standards to write maintainable Node.js applications.',
//     },
//     {
//       title: 'Building a blog with Node.js',
//       body: 'This is the first blog.',
//     },
//     {
//       title: 'Adding a blog post for the first time',
//       body: 'This is the second blog.',
//     },
//     {
//       title: 'Creating a blog in Node.js for the millionth time',
//       body: 'This is the third blog.',
//     },
//     {
//       title: 'Optimizing API performance in Express',
//       body: "Let's explore how to make our API faster and more efficient.",
//     },
//     {
//       title: 'Understanding Middleware in Express.js',
//       body: 'Middleware functions are at the core of Express applications.',
//     },
//     {
//       title: 'Why You Should Use TypeScript in Node.js',
//       body: 'TypeScript adds strong typing, which improves code quality.',
//     },
//     {
//       title: 'Deploying a Node.js App to Vercel',
//       body: 'Learn how to deploy a Node.js app step-by-step using Vercel.',
//     },
//     {
//       title: 'Handling Authentication with JWT in Node.js',
//       body: 'Secure your APIs using JSON Web Tokens (JWT) authentication.',
//     },
//     {
//       title: 'Using Mongoose for Database Operations',
//       body: 'Mongoose simplifies database interactions with MongoDB.',
//     },
//     {
//       title: 'Best Practices for Writing Clean Node.js Code',
//       body: 'Follow these coding standards to write maintainable Node.js applications.',
//     },
//     {
//       title: 'Scaling a Node.js Application',
//       body: 'Learn how to scale your Node.js application efficiently.',
//     },
//     {
//       title: 'How to Handle Errors in Express',
//       body: 'A guide to error handling strategies in Express.js applications.',
//     },
//     {
//       title: 'Working with WebSockets in Node.js',
//       body: 'Real-time communication made easy with WebSockets in Node.js.',
//     },
//     {
//       title: 'Building a REST API with Node.js and Express',
//       body: 'Step-by-step guide to creating a RESTful API with Node.js.',
//     },
//     {
//       title: 'Understanding Event Loop in Node.js',
//       body: 'A deep dive into how the event loop works in Node.js.',
//     },
//     {
//       title: 'Caching in Node.js with Redis',
//       body: "Boost your app's performance using Redis for caching.",
//     },
//     {
//       title: 'Unit Testing in Node.js with Jest',
//       body: 'Learn how to write and run tests in a Node.js application.',
//     },
//     {
//       title: 'File Uploads in Node.js with Multer',
//       body: 'A guide on handling file uploads in Express using Multer.',
//     },
//     {
//       title: 'Building a CLI Tool with Node.js',
//       body: 'Create a command-line interface tool using Node.js.',
//     },
//     {
//       title: "Node.js vs Deno: What's the Difference?",
//       body: 'Comparing Node.js with its new competitor, Deno.',
//     },
//   ]);
// };
// insertPostData();
export default router;
