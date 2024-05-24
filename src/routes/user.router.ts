import { Router } from 'express';

import {} from '@/controllers';

import { authMiddleware } from '@/middlewares';

const authRouter = Router();

export { authRouter };
