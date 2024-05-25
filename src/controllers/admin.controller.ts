import { ObjectId } from 'mongoose';
import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

import { adminService } from '@/services';
import { ApiResponse, getPagination, getPaginationOptions } from '@/utils';
import { IQuery, MessageType } from '@/types';
import { BadRequestError } from '@/errors';

export const getUsersStatistics = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const id = req.user!._id;

    if (!id) {
      throw new BadRequestError([
        {
          message: 'User not found',
          type: MessageType.ERROR,
        },
      ]);
    }

    const { data, paginationResult } = await adminService.getUserStatistics(
      req.query as IQuery,
    );

    const response = new ApiResponse({
      messages: [
        {
          message: 'Users statistics',
          type: MessageType.SUCCESS,
        },
      ],
      statusCode: StatusCodes.OK,
      data,
      pagination: getPagination({
        total: paginationResult.total,
        limit: paginationResult.limit,
        length: data.length,
        page: paginationResult.page,
      }),
    });

    res.status(response.statusCode).json(response);
  },
);
