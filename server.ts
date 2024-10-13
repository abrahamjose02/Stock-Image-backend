import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


import router from './src/routes/authRoute';
import connectDB from './src/config/db';
import imageRouter from './src/routes/imageRoute';


dotenv.config();


const app = express();


connectDB();


app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));
app.use(cookieParser());

app.use('/api/auth', router);
app.use('/api/image', imageRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on PORT : ${PORT}`);
});
