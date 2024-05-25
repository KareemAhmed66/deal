import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongoose';

import { propertyService } from '@/services';
import { ApiResponse, getPagination, getPaginationOptions } from '@/utils';
import { MessageType, IProperty, updatePropertyBody, IQuery } from '@/types';
import { BadRequestError } from '@/errors';

export const createProperty = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const propertyData = <IProperty>req.body;
    const userId = req.user!._id;

    if (!userId) {
      throw new BadRequestError([
        {
          message: 'User not found',
          type: MessageType.ERROR,
        },
      ]);
    }

    propertyData.userId = userId as unknown as ObjectId;

    const property = await propertyService.createProperty(propertyData);

    if (!property) {
      throw new BadRequestError([
        {
          message: 'Error Creating Property',
          type: MessageType.ERROR,
        },
      ]);
    }

    const response = new ApiResponse({
      messages: [
        {
          message: 'Property Created Successfully',
          type: MessageType.SUCCESS,
        },
      ],
      statusCode: StatusCodes.CREATED,
      data: property,
    });

    res.status(response.statusCode).json(response);
  },
);

export const getProperties = expressAsyncHandler(
  async (req: Request, res: Response) => {

    const { data, paginationResult} = await propertyService.getProperties(req.query as IQuery);
    const {
      totalPages,
      page,
      limit,
      total,
    }: {
      totalPages: number;
      page: number;
      limit: number;
      total: number;
    } = paginationResult;

    const response = new ApiResponse({
      messages: [
        {
          message: 'Properties Fetched Successfully',
          type: MessageType.SUCCESS,
        },
      ],
      statusCode: StatusCodes.OK,
      data: data,
      pagination: getPagination({
        total: total,
        limit: limit,
        length: data.length,
        page: page,
      }),
    });

    res.status(response.statusCode).json(response);
  },
);

export const updateProperty = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const propertyData = <updatePropertyBody>req.body;
    const property = await propertyService.updateProperty(id, propertyData);

    if (!property) {
      throw new BadRequestError([
        {
          message: 'Error Updating Property',
          type: MessageType.ERROR,
        },
      ]);
    }

    const response = new ApiResponse({
      messages: [
        {
          message: 'Property Updated Successfully',
          type: MessageType.SUCCESS,
        },
      ],
      statusCode: StatusCodes.OK,
      data: property,
    });

    res.status(response.statusCode).json(response);
  },
);
