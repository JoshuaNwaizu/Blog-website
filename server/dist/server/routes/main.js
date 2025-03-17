"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mainController_js_1 = require("../controllers/mainController.js");
var router = express.Router();
router.get('/post', mainController_js_1.getAllPosts);
router.get('/post/:id', mainController_js_1.getPostById);
router.post('/search', mainController_js_1.searchPosts);
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
exports.default = router;
