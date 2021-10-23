import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import { config } from "dotenv";

config();

import auth from "./routes/auth";
import user from "./routes/user";
const app = express();

const Server = async () => {
  const PORT = process.env.PORT || 5000;
  const DB = process.env.MONGODB_URL || "mongodb://localhost/db-template";
  try {
    //connect to the database
    await mongoose.connect(DB);

    //bodyparser setup
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(cookieParser());

    //route
    app.use("/api/auth", auth);
    app.use("/api/user", user);

    app.get("/", (req, res) => res.json({ name: "aderrwr" }));

    //static files
    app.use(express.static(path.join(__dirname, "../uploads")));

    app.listen(PORT, () => {
      console.log(`app is listen on port ${PORT}!!!`);
    });
  } catch (error) {
    console.log(error);
  }
};

Server();
export default app;
