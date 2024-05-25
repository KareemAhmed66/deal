import { Router } from 'express';

import { authRouter } from './auth.router';
import { adRouter } from './ad.router';
import { propertyRouter } from './property.router';
import { adminRouter } from './admin.router';
const mountRouter = Router();

mountRouter.use('/auth', authRouter);
mountRouter.use('/ads', adRouter);
mountRouter.use('/properties', propertyRouter);
mountRouter.use('/admin', adminRouter);

export { mountRouter };
