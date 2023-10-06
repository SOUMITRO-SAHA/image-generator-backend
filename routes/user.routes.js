import express from 'express';
import {
  registration,
  login,
  logOut,
  checkSession,
} from '../controllers/user.controllers.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';

const router = express.Router();

// Routers
// Authentication:
router
  .post('/auth/register', registration)
  .post('/auth/login', login)
  .get('/auth/logout', logOut)
  .get('/auth/session', isLoggedIn, checkSession);

export default router;
