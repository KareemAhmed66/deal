import { Types } from 'mongoose';

import { IProperty } from '@/types';

export interface IAd extends IProperty {
  userId: Types.ObjectId;
}
