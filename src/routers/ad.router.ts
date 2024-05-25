import { Router } from 'express';

import { createAd, getAds, matchAds } from '@/controllers';

import { authMiddleware, allowedTo } from '@/middlewares';
import { UserRole } from '@/types';

const adRouter = Router();

adRouter.all('*', authMiddleware);

adRouter.route('/').post(allowedTo(UserRole.AGENT), createAd).get(getAds);

adRouter.route('/:id').get(matchAds);

export { adRouter };
