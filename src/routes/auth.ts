import { Router } from "express";

import trim from "../helpers/trim"; // trim middleware for input data
import { register, login, is_me, logout } from "../controllers/auth";
import { register_validation, login_validation } from "../validations/auth";
import { auth_middleware } from "../middlewares/auth";

const router = Router();

//desc register route
router.post("/register", [trim, register_validation], register);

//@desc login route
//private route
router.post("/login", [trim, login_validation], login);

//@desc  get profile
//private route
router.get("/isme", [auth_middleware], is_me);

//@desclogout route
//private route
router.get("/logout", [auth_middleware], logout);

export default router;
