import express from 'express';
import cors from 'cors';
import authRoutes from './api/auth.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
}); 