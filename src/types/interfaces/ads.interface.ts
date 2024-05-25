import { IProperty } from '@/types';

export interface IAd extends IProperty {}
export interface updateAdBody {
  area?: string;
  price?: number;
  description?: string;
}
