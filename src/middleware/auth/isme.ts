import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/user';

export const isMeMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) return res.status(403).json({ error: 'unathorize' });
        const token = authorization.split(' ')[1];
        console.log(token, 'token');

        if (!process.env.JWT_SECRET) return res.status(500).json({ error: 'unathorized,jwt_secret is no provided' });

        const { _id }: any = jwt.verify(token, process.env.JWT_SECRET);

        if (!_id) return res.status(403).json({ error: 'unathorized,user verified fail' });

        const user = await User.findById(_id);
        if (!user) return res.status(400).json({ error: 'unathorized,user not found' });

        res.locals.user = user;

        next();
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
