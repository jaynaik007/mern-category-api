import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import categoryRoutes from './routes/categoryRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);

app.get('/', (_req, res) => {
  res.send('API is running...');
});

export default app;
