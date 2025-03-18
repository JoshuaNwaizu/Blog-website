import express from 'express';
import { getAllPosts, getPostById, searchPosts, } from '../controllers/mainController.js';
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
//
//
//   ]);
// };
// insertPostData();
export default router;
//# sourceMappingURL=main.js.map