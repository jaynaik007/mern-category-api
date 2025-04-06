import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 5000;
const DB_URI = `${process.env.MONGO_URI}${process.env.MONGO_DB_NAME}`;

mongoose.connect(DB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
