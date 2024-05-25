import { Router } from 'express';

import { authRouter } from './auth.router';
import { adRouter } from './ad.router';
import { propertyRouter } from './property.router';
import { adminRouter } from './admin.router';
import { specs, swaggerUi } from '@/swagger';

const mountRouter = Router();

mountRouter.use('/auth', authRouter);
mountRouter.use('/ads', adRouter);
mountRouter.use('/properties', propertyRouter);
mountRouter.use('/admin', adminRouter);
mountRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

export { mountRouter };
