import * as express from 'express';

import {
  protect,
  dashboard,
  login,
  register,
  addPost,
  createPost,
  editPost,
  deletePost,
  logout,
  getUsers,
} from '../controllers/adminController.js';

const router = express.Router();

router.route('/admin').post(login);
router.route('/register').post(register);
router.route('/add-post').get(protect, addPost).post(protect, createPost);
router.route('/edit-post/:id').patch(protect, editPost);
router.route('/dashboard').get(protect, dashboard);
router.route('/delete-post/:id').delete(protect, deletePost);
router.route('/logout').get(protect, logout);
router.route('/users').get(protect, getUsers);

export default router;
