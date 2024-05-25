import { Router } from 'express';

import { login, register, logout } from '@/controllers';

import { authMiddleware } from '@/middlewares';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', authMiddleware, logout);

export { authRouter };
