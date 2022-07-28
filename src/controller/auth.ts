import { NextFunction, Response, Request } from 'express';
import User from '../models/user';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = new User({
            lastname: req.body.lastname
        });
        await newUser.save();
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
