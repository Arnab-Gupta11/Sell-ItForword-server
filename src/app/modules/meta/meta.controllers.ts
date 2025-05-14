import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { MetaServices } from './meta.services';
import sendResponse from '../../utils/sendResponse';

const getMetaData = catchAsync(async (req: Request, res: Response) => {
  const result = await MetaServices.getMetadata(req.user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Metadata retrived successfully.',
    data: result,
  });
});
export const MetaControllers = {
  getMetaData,
};
