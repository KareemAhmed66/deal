import { Router } from 'express';

import { getUsersStatistics, getAllUsers } from '@/controllers';

import { allowedTo, authMiddleware } from '@/middlewares';
import { UserRole } from '@/types';

const adminRouter = Router();

adminRouter.all('*', authMiddleware, allowedTo(UserRole.ADMIN));

adminRouter.get('/getAllUsers', getAllUsers);

adminRouter.get('/statistics', getUsersStatistics);

export { adminRouter };
