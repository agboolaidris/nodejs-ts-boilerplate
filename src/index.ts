import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, MONGODB_URL } from './config';
import AuthRoute from './routes/auth';
import UserRoute from './routes/user';
const app = express();

const Server = async () => {
    try {
        await mongoose.connect(MONGODB_URL, { retryWrites: true, w: 'majority' });
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        app.use('/api/auth', AuthRoute);
        app.use('/api/user', UserRoute);

        app.listen(PORT, () => {
            console.log(`app is listen on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

Server();
