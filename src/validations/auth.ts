import { Response, Request, NextFunction } from "express";
import { isEmail } from "./index";
import { User } from "../models/user";

export const register_validation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors: any = {};
    const { username, email, password, confirmpassword, mobile } = req.body;

    if (!username) errors.username = "username is required";

    if (!email) errors.email = "email is required";

    if (!password) errors.password = "password is required";

    if (!confirmpassword)
      errors.confirmpassword = "confirmpassword is required";

    if (mobile && mobile.length < 11)
      errors.mobile = "mobile number most not less than 11 digit";

    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    const checkUsername = await User.findOne({ username });
    if (checkUsername) errors.username = "username already exist";

    const checkEmail = await User.findOne({ email });
    if (checkEmail) errors.email = "email already exist";

    if (username.length < 3)
      errors.username = "username most be greater than 2 characters";

    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    if (password.length < 6)
      errors.password = "password length most be 6 character or more";

    if (!isEmail(email)) errors.email = "email is invalid";

    if (confirmpassword !== password)
      errors.confirmpassword = "password not match";

    if (Object.keys(errors).length > 0) return res.status(400).json(errors);
    next();
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const login_validation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors: any = {};
    const { email, password } = req.body;

    if (!email) errors.email = "email is required";

    if (!password) errors.password = "password is required";

    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    next();
  } catch (error) {
    res.status(400).json({ error });
  }
};
