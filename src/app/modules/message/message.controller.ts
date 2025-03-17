import { Request, Response } from 'express';
import { MessageServices } from './message.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const sendMessage = catchAsync(async (req: Request, res: Response) => {
  const { receiverId } = req.params;
  const result = await MessageServices.sendMessage(
    req.user,
    receiverId,
    req.body,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Message send successfully.',
    data: result,
  });
});

export const MessageControllers = {
  sendMessage,
};
