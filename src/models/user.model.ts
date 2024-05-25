import mongoose from 'mongoose';

import { IUser } from '../types/interfaces/user.interface';

import { Models, UserRole, UserStatus } from '@/types';

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(UserStatus),
    required: true,
    default: UserStatus.ACTIVE,
  },
  role: { type: String, enum: Object.values(UserRole), required: true },
});

export const User = mongoose.model<IUser>(Models.User, userSchema, Models.User);
