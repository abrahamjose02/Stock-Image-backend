import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import router from './src/routes/authRoute';
import connectDB from './src/config/db';
import imageRouter from './src/routes/imageRoute';

dotenv.config();

const app = express();

connectDB()
    .then(() => console.log('Connected to Database'))
    .catch(err => {
        console.error('Database connection failed:', err);
        process.exit(1);
    });

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());

app.use('/api/auth', router);
app.use('/api/image', imageRouter);

const port = process.env.PORT || 10000;

function logMemoryUsage() {
    const used = process.memoryUsage();
    console.log(`Memory usage: ${Math.round(used.rss / 1024 / 1024 * 100) / 100} MB`);
}

setInterval(logMemoryUsage, 300000); // Log every 5 minutes

app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`);
});