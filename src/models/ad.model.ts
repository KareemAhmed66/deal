import mongoose from 'mongoose';

import { IAd, Models } from '@/types';

const adSchema = new mongoose.Schema<IAd>({
  propertyType: { type: String, required: true },
  area: { type: String, required: true },
  price: { type: Number, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  description: { type: String, required: true },
  refreshedAt: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

export const Ad = mongoose.model<IAd>(Models.Ad, adSchema, Models.Ad);
