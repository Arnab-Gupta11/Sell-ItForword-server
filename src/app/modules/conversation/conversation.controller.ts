import { Request, Response } from 'express';
import { ConversationServices } from './conversation.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const getAllConversationOfAUser = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ConversationServices.getAllConversationOfAUserFromDB(
      req.user,
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'All conversation retrived successfully.',
      data: result,
    });
  },
);
export const ConversationControllers = {
  getAllConversationOfAUser,
};
