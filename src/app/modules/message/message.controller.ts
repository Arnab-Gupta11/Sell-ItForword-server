import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MessageServices } from './message.service';

// Create a message
const createMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageServices.createMessage(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Message sent successfully',
    data: result,
  });
});

// Get all messages
const getAllMessages = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageServices.getAllMessages();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Messages retrieved successfully',
    data: result,
  });
});

// Get a single message
const getSingleMessage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await MessageServices.getSingleMessage(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Message retrieved successfully',
    data: result,
  });
});

export const MessageControllers = {
  createMessage,
  getAllMessages,
  getSingleMessage,
};
