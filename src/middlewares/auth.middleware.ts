import expressAsyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from 'express';

import { UnauthorizedError } from '@/errors';
import { verifyToken } from '@/utils';
import { userService } from '@/services';

export const authMiddleware = expressAsyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const token = <string | undefined>req.session?.token;

    if (!token) {
      throw new UnauthorizedError('Session expired, please login again');
    }

    const { id } = verifyToken(token);

    const user = await userService.getUser(id);

    if (!user) {
      throw new UnauthorizedError('Your Account is not exist');
    }

    req.user = user;

    next();
  },
);
