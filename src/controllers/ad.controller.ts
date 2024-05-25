import { ObjectId } from 'mongoose';
import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

import { adService } from '@/services';
import { ApiResponse, getPagination, getPaginationOptions } from '@/utils';
import { MessageType, IAd, updateAdBody, IQuery } from '@/types';
import { BadRequestError } from '@/errors';

export const createAd = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const adData = <IAd>req.body;
    const userId = req.user!._id;
    if (!userId) {
      throw new BadRequestError([
        {
          message: 'User not found',
          type: MessageType.ERROR,
        },
      ]);
    }

    adData.userId = userId as unknown as ObjectId;

    const ad = await adService.createAd(adData);

    if (!ad) {
      throw new BadRequestError([
        {
          message: 'Error Creating Ad',
          type: MessageType.ERROR,
        },
      ]);
    }

    const response = new ApiResponse({
      messages: [
        {
          message: 'Ad Created Successfully',
          type: MessageType.SUCCESS,
        },
      ],
      statusCode: StatusCodes.CREATED,
      data: ad,
    });

    res.status(response.statusCode).json(response);
  },
);

export const getAds = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { data, paginationResult } = await adService.getAds(
      req.query as IQuery,
    );

    const adsCount = await adService.getAdsCount();

    const response = new ApiResponse({
      messages: [
        {
          message: 'Ads Fetched Successfully',
          type: MessageType.SUCCESS,
        },
      ],
      statusCode: StatusCodes.OK,
      data: data,
      pagination: getPagination({
        total: paginationResult.totalPages,
        limit: paginationResult.limit,
        length: data.length,
        page: paginationResult.page,
      }),
    });
    res.status(response.statusCode).json(response);
  },
);

export const matchAds = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { page, limit } = req.query;
    const { currentPage, itemsPerPage } = getPaginationOptions(
      page as string | undefined,
      limit as string | undefined,
    );

    const matchedAds = await adService.matchAdsById(
      id,
      currentPage,
      itemsPerPage,
    );

    const response = new ApiResponse({
      messages: [
        {
          message: 'Ads Matched Successfully',
          type: MessageType.SUCCESS,
        },
      ],
      statusCode: StatusCodes.OK,
      data: matchedAds.matchedPropertyRequests,
      pagination: getPagination({
        total: matchedAds.count,
        limit: itemsPerPage,
        length: matchedAds.matchedPropertyRequests.length,
        page: currentPage,
      }),
    });

    res.status(response.statusCode).json(response);
  },
);
