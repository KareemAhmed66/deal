import { UserRole, UserStatus } from '@/types';

export interface IUser {
  name: string;
  password: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
}
