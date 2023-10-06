import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import connect from './config/database.js';
import imageRoutes from './routes/image.routes.js';
import userRoutes from './routes/user.routes.js';

// Establishing the Database connection
connect();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Making the Upload Folder Public:
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use(userRoutes);
app.use('/images', imageRoutes);

export default app;
