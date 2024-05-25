import { Router } from 'express';

import { getUsersStatistics } from '@/controllers';

import { allowedTo, authMiddleware } from '@/middlewares';
import { UserRole } from '@/types';

const adminRouter = Router();

adminRouter.all('*', authMiddleware, allowedTo(UserRole.ADMIN));

adminRouter.get('/statistics', getUsersStatistics);

export { adminRouter };
