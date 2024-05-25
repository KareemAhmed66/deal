import { Ad, Property } from '@/models';
import { IAd, updateAdBody, IQuery } from '@/types';
import { ApiFeatures } from '@/utils';

const createAd = async (adData: IAd) => {
  const ad = new Ad(adData);
  ad.refreshedAt = new Date();
  return await ad.save();
};

const getAdsCount = async () => {
  return await Ad.countDocuments();
};

const getAds = async (query: IQuery) => {
  // Create an instance of ApiFeatures
  const { data, paginationResult } = await new ApiFeatures(
    Ad.find({}) as any,
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

const getAdById = async (adId: string) => {
  return await Ad.findById(adId);
};

const updateAd = async (adId: string, adData: updateAdBody) => {
  const { area, price, description } = adData;
  return await Ad.updateOne({ _id: adId }, { area, price, description });
};

const deleteAd = async (adId: string) => {
  return await Ad.deleteOne({ _id: adId });
};

export const matchAdsById = async (
  id: string,
  currentPage: number,
  itemsPerPage: number,
) => {
  const ad = await Ad.findById(id);

  if (!ad) {
    throw new Error('Ad not found');
  }

  // Find property requests that match the ad
  const matchedPropertyRequests = await Property.aggregate([
    {
      $match: {
        district: ad.district,
        price: { $gte: ad.price * 0.9, $lte: ad.price * 1.1 },
        area: ad.area,
      },
    },
    { $sort: { refreshedAt: -1 } },
    { $skip: currentPage },
    { $limit: itemsPerPage },
  ]);

  const count = await Property.aggregate([
    {
      $match: {
        district: ad.district,
        price: { $gte: ad.price * 0.9, $lte: ad.price * 1.1 },
        area: ad.area,
      },
    },
    { $count: 'count' },
  ]);

  return {
    matchedPropertyRequests,
    count: count.length > 0 ? count[0].count : 0,
  };
};

export const adService = {
  createAd,
  getAdById,
  getAds,
  updateAd,
  deleteAd,
  getAdsCount,

  matchAdsById,
};
