import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';
import { getMovies, addMovie } from './controllers/adminController.js';

const app = express();
const PORT = process.env.PORT || 5003;

app.use(
  cors({
    origin: 'http://localhost:3000', // FE URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);
app.use(express.json());

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);

// Khởi động server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
