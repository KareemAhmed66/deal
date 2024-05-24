import { User } from '@/models';
import { IUser } from '@/types';

const createUser = async (userData: IUser) => {
  const user = new User(userData);
  return await user.save();
};

const getUsers = async () => {
  return await User.find();
};

const getUser = async (userId: string) => {
  return await User.findById(userId);
};

const updateUser = async (userId: string, userData: IUser) => {
  return await User.findByIdAndUpdate(userId, userData, { new: true });
};

const deleteUser = async (userId: string) => {
  return await User.findByIdAndDelete(userId);
};

export const userService = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
