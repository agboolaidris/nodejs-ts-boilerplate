import mongoose, { Document, Schema } from 'mongoose';
import argon2 from 'argon2';

export interface IUser {
    lastname: string;
    firstname: string;
    email: string;
    password: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema = new Schema(
    {
        lastname: { type: String, required: true },
        firstname: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true }
    },
    { versionKey: false, timestamps: true }
);

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await argon2.hash(this.password);
    }
    return next();
});

export default mongoose.model<IUserModel>('User', UserSchema);
