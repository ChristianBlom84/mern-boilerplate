import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import BaseRouter from './routes';
import { connectDB } from '../util/connectDb';

// Init express
const app = express();

// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  cors({
    origin: [`${process.env.CORS}`, 'http://localhost:3000', /192.168\$/],
    credentials: true
  })
);
app.use('/api', BaseRouter);

// Connect Database
(async (): Promise<void> => {
  try {
    console.log('Connecting to DB');
    await connectDB();
  } catch (error) {
    console.log('MongoDB connection error');
    console.error(error);
    setTimeout(async () => {
      await connectDB();
    }, 5000);
  }
})();

// Export express instance
export default app;
