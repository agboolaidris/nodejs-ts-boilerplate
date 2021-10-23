import { Router } from "express";

import trim from "../helpers/trim"; // trim middleware for input data
import { update_user, upload_image } from "../controllers/user";

import { auth_middleware } from "../middlewares/auth";

const router = Router();

//@desc  update user
//private route
router.patch("/update", [auth_middleware, trim], update_user);

//@desc  upload image
//private route
router.post("/upload", [auth_middleware, trim], upload_image);

export default router;
