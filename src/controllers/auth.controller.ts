import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

import { authService } from '@/services';
import { ApiResponse, Password, generateToken } from '@/utils';
import { MessageType, registerBody } from '@/types';
import { BadRequestError } from '@/errors';

export const register = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const userBody = <registerBody>req.body;
    userBody.password = Password.hash(userBody.password);
    const newUser = await authService.registerUser(userBody);

    if (!newUser) {
      throw new BadRequestError([
        { message: 'Error Registering The User', type: MessageType.ERROR },
      ]);
    }

    const token = generateToken({ id: newUser.id });

    req.session = { token };

    const response = new ApiResponse({
      messages: [
        {
          message: 'registered successfully',
          type: MessageType.SUCCESS,
        },
      ],
      statusCode: StatusCodes.CREATED,
      data: { newUser },
    });
    res.status(response.statusCode).json(response);
  },
);

export const login = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { phone, password } = req.body;
    const user = await authService.getUserByPhone(phone);

    if (!user || !Password.compare(password, user.password)) {
      throw new BadRequestError([
        {
          message: 'Invalid Phone Number or Password',
          type: MessageType.ERROR,
        },
      ]);
    }

    const token = generateToken({ id: user.id });

    req.session = { token };

    const response = new ApiResponse({
      messages: [
        {
          message: 'logged in successfully',
          type: MessageType.SUCCESS,
        },
      ],
      statusCode: StatusCodes.OK,
      data: { user },
    });

    res.status(response.statusCode).json(response);
  },
);

export const logout = expressAsyncHandler(
  async (req: Request, res: Response) => {
    req.session = null;
    const response = new ApiResponse({
      messages: [
        {
          message: 'logged out successfully',
          type: MessageType.SUCCESS,
        },
      ],
      statusCode: StatusCodes.OK,
      data: {},
    });

    res.status(response.statusCode).json(response);
  },
);
