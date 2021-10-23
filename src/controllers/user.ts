import fs from "fs";
import { Response, Request } from "express";
import imageThumbnail from "image-thumbnail";

import download from "download";
import { User } from "../models/user";
import { is_URL } from "../validations";

//update user controller
export const update_user = async (req: Request, res: Response) => {
  try {
    let { username, email, password } = req.body;

    const user = User.findByIdAndUpdate(res.locals.id, {
      username: username && username,
      email: email && username,
    });

    return res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

//upload image  controller
export const upload_image = async (req: Request, res: Response) => {
  try {
    let { url } = req.body;
    if (!is_URL(url)) return res.status(400).json({ url: "invalid url" });

    const thumbnail = await imageThumbnail(await download(url), {
      width: 50,
      height: 50,
      responseType: "buffer",
    });

    const name = Date.now() + ".jpg";

    fs.writeFileSync(`uploads/${name}`, thumbnail);

    return res.json({ res: `${process.env.BASE_URL}/${name}` });
  } catch (error) {
    res.status(500).json({ error });
  }
};
