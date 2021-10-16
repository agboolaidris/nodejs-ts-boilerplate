import { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { User } from "../models/user";

//register controller
export const register = async (req: Request, res: Response) => {
  try {
    let { username, email, password } = req.body;
    const adminProps: any = {
      username,
      email,
      password,
    };

    const newAdmin = new User(adminProps);
    await newAdmin.save(); //save data to database
    return res.json({ msg: "register successful" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//login controller
export const login = async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;

    //check if email address exist
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ email: "email is invalid" });

    //confirm password
    const confirmPassword = await bcrypt.compare(password, user.password);
    if (!confirmPassword)
      return res.status(400).json({ password: "password is invalid" });

    //check if the jwt_secret was available in the environment
    if (!process.env.JWT_SECRET)
      return res.status(500).json({ error: "jwt_secret is no provided" });

    //token generate
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    //setup cookie
    res.set(
      "Set-Cookie",
      cookie.serialize("access-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600,
        path: "/",
      })
    );

    return res.json({ msg: "login successful" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("access-token").json({ msg: "logout successful" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const is_me = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(res.locals.user._id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
