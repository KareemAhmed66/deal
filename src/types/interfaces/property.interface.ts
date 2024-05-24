import { PropertyType } from '@/types';

export interface IProperty {
  propertyType: PropertyType;
  area: number;
  price: number;
  city: string;
  district: string;
  description: string;
  refreshedAt: Date;
}
