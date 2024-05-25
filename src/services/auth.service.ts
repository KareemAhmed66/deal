import { User } from '@/models';
import { IUser, registerBody } from '@/types';

const createUser = async (userData: IUser) => {
  const user = new User(userData);
  return await user.save();
};

const getUserByPhone = async (phone: string) => {
  return await User.findOne({ phone });
};

const getUserById = async (userId: string) => {
  return await User.findById(userId);
};

const registerUser = async (userData: registerBody) => {
  return await createUser(userData);
};
const login = async (phone: string, password: string) => {
  return await User.findOne({ phone, password });
};

export const authService = {
  registerUser,
  login,
  getUserByPhone,
  getUserById,
};
