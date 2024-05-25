import { UserRole } from '@/types';
import expressAsyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';

import { UnauthorizedError } from '@/errors';

export const allowedTo = (...roles: UserRole[]) =>
  expressAsyncHandler(
    async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
      if (!roles.includes(req.user!.role)) {
        throw new UnauthorizedError('You are not authorized');
      }

      next();
    },
  );
