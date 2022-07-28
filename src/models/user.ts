import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
    lastname: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        lastname: { type: String, required: true }
    },
    { versionKey: false }
);

export default mongoose.model<IUserModel>('User', UserSchema);
