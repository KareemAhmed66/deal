import { Property } from '@/models';

import { IProperty, IQuery, updatePropertyBody } from '@/types';
import { ApiFeatures } from '@/utils';

const createProperty = async (propertyData: IProperty) => {
  const property = new Property(propertyData);
  property.refreshedAt = new Date();
  return await property.save();
};

const getPropertiesCount = async () => {
  return await Property.countDocuments();
};

const getProperties = async (query: IQuery) => {
  // Create an instance of ApiFeatures
  const { data, paginationResult } = await new ApiFeatures(
    Property.find({}) as any,
    query,
  )
    .filter()
    .search()
    .sort()
    .limitFields()
    .populate()
    .paginate();

  return {
    data,
    paginationResult,
  };
};

const getPropertyById = async (propertyId: string) => {
  return await Property.findById(propertyId);
};

const updateProperty = async (
  propertyId: string,
  propertyData: updatePropertyBody,
) => {
  const { area, price, description } = propertyData;
  return await Property.updateOne(
    { _id: propertyId },
    { area, price, description, refreshedAt: new Date() },
  );
};

const deleteProperty = async (propertyId: string) => {
  return await Property.deleteOne({ _id: propertyId });
};

export const propertyService = {
  createProperty,
  getPropertyById,
  getProperties,
  updateProperty,
  deleteProperty,
  getPropertiesCount,
};
