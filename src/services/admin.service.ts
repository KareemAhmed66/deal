import { Property, Ad, User } from '@/models';
import { Document } from 'mongoose';
import { IUser, UserRole, IQuery, IPaginationResult } from '@/types';
import { ApiFeatures } from '@/utils';

const getUserCounts = async (
  userId: string,
): Promise<{
  adCount: number;
  requestCount: number;
}> => {
  const adsCount = await Ad.aggregate([
    { $match: { userId } },
    { $count: 'adCount' },
  ]);

  const requestsCount = await Property.aggregate([
    { $match: { userId } },
    { $count: 'requestCount' },
  ]);

  console.log(adsCount, requestsCount);

  return {
    adCount: adsCount.length > 0 ? adsCount[0].adCount : 0,
    requestCount: requestsCount.length > 0 ? requestsCount[0].requestCount : 0,
  };
};

const getTotals = async (): Promise<{
  totalAdCount: number;
  totalRequestCount: number;
}> => {
  const totalAdCount = await Ad.aggregate([{ $count: 'totalAdCount' }]);

  const totalRequestCount = await Property.aggregate([
    { $count: 'totalRequestCount' },
  ]);

  return {
    totalAdCount: totalAdCount.length > 0 ? totalAdCount[0].totalAdCount : 0,
    totalRequestCount:
      totalRequestCount.length > 0 ? totalRequestCount[0].totalRequestCount : 0,
  };
};

const getAllUsers = async (
  query: IQuery,
): Promise<{ data: IUser[]; paginationResult: IPaginationResult }> => {
  // Create an instance of ApiFeatures
  const { data, paginationResult } = await new ApiFeatures(
    User.find({ role: { $ne: UserRole.ADMIN } }).select({
      password: 0,
    }) as any,
    query,
  )
    .filter()
    .search()
    .sort()
    .limitFields()
    .populate()
    .paginate();

  return {
    data: data as unknown as IUser[],
    paginationResult,
  };
};

const getUserStatistics = async (
  query: IQuery,
): Promise<{ data: IUser[]; paginationResult: IPaginationResult }> => {
  const total = await getTotals();
  const { data, paginationResult } = await getAllUsers(query);

  // Use Promise.all for parallel execution of user count retrieval
  const userStatisticsPromises = data.map(async (user) => {
    const userStatistics = await getUserCounts(user._id as string);
    return {
      ...user.toObject(),
      adCount: userStatistics.adCount,
      requestCount: userStatistics.requestCount,
      totalAdCount: total.totalAdCount,
      totalRequestCount: total.totalRequestCount,
    };
  });

  const enrichedData = await Promise.all(userStatisticsPromises);

  console.log(enrichedData);

  return {
    data: enrichedData,
    paginationResult,
  };
};

export const adminService = {
  getUserStatistics,
  getUserCounts,
  getTotals,
  getAllUsers,
};
