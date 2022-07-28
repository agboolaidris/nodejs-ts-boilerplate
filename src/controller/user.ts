import { NextFunction, Response, Request } from 'express';
import User from '../models/user';

export const allUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const user = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.findById(req.params.id);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
