import { NextFunction, Response, Request } from 'express';
import argon2 from 'argon2';
import User, { IUserModel } from '../models/user';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const confirmUser: IUserModel | null = await User.findOne({ email });

        if (confirmUser === null) return res.status(400).json({ error: { email: 'email is not exist' } });

        const bcy_password = await argon2.verify(confirmUser.password, password);
        if (!bcy_password) return res.status(400).json({ error: { password: 'password is not valid' } });
        const token = jwt.sign({ _id: confirmUser._id }, JWT_SECRET);
        res.json({ user: confirmUser, token });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const isme = async (_: Request, res: Response) => {
    try {
        res.json({ user: res.locals.user });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
