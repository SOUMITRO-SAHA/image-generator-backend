import express from 'express';
import {
  createImage,
  findImagesByUserId,
} from '../controllers/image.controllers.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';

const router = express.Router();

// Routes for Image
router
  .post('/', isLoggedIn, createImage)
  .get('/user/:id', isLoggedIn, findImagesByUserId);

export default router;
