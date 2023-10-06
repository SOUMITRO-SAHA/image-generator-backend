import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import connect from './config/database.js';
import userRoutes from './routes/user.routes.js';
import imageRoutes from './routes/image.routes.js';

// Establishing the Database connection
connect();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: '*',
  })
);
app.use(morgan('tiny'));

// Routes
app.use(userRoutes);
app.use('/images', imageRoutes);

export default app;
