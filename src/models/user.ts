import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface userInput extends Document {
  username: string;
  email: string;
  password: string;
}

const schema = new Schema<userInput>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

//hash password
schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const User = model<userInput>("User", schema);
