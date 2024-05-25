import { ObjectId } from 'mongoose';
import { PropertyType } from '@/types';

export interface IProperty {
  propertyType: PropertyType;
  area: string;
  price: number;
  city: string;
  district: string;
  description: string;
  refreshedAt: Date;
  userId: ObjectId;
}

export interface updatePropertyBody {
  area?: string;
  price?: number;
  description?: string;
}
