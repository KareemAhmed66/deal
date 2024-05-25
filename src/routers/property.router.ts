import { Router } from 'express';

import { createProperty, getProperties, updateProperty } from '@/controllers';

import { authMiddleware, allowedTo } from '@/middlewares';
import { UserRole } from '@/types';

const propertyRouter = Router();

propertyRouter.all('*', authMiddleware);

propertyRouter
  .route('/')
  .post(allowedTo(UserRole.CLIENT), createProperty)
  .get(getProperties);

propertyRouter.route('/:id').put(allowedTo(UserRole.CLIENT), updateProperty);

export { propertyRouter };
