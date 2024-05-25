import mongoose from 'mongoose';

import { IProperty, Models } from '@/types';

const propertySchema = new mongoose.Schema<IProperty>({
  propertyType: { type: String, required: true },
  area: { type: String, required: true },
  price: { type: Number, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  description: { type: String, required: true },
  refreshedAt: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

export const Property = mongoose.model<IProperty>(
  Models.Property,
  propertySchema,
  Models.Property,
);
