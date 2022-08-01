import { NextFunction, Response, Request } from 'express';
import { isEmail } from '../../utils/email';

export const registerValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        //return res.status(400).json({ msg: 'err' });
        const { firstname, lastname, email, password } = req.body;
        const error: any = {};
        if (!firstname || firstname?.trim() === '') error.firstname = 'firstname is required';

        if (!lastname || lastname?.trim() === '') error.lastname = 'lastname is required';
        if (!email || email?.trim() === '') error.email = 'email is required';
        if (!password || password?.trim() === '') error.password = 'password is required';

        if (Object.keys(error).length > 0) return res.status(400).json(error);
        if (!isEmail(email) || email !== email?.toLowerCase()) error.email = 'invalid email address';
        if (password.length < 6) error.password = 'password most be at least 6 character long';

        if (Object.keys(error).length > 0) return res.status(400).json(error);

        next();
    } catch (error) {
        res.status(400).json({ error, msg: 'errr' });
    }
};

export const loginValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const error: any = {};

        if (!email || email?.trim() === '') error.email = 'email is required';
        if (!password || password?.trim() === '') error.password = 'password is required';

        if (Object.keys(error).length > 0) return res.status(400).json(error);
        console.log(email);
        if (!isEmail(email)) return res.status(400).json({ error: { email: 'invalid email address' } });

        next();
    } catch (error) {
        res.status(400).json({ error, msg: 'errr' });
    }
};
