import { Request, Response } from 'express';
import { conversationService } from './conversation.service';

export const conversationController = {
  async getAll(req: Request, res: Response) {
    const data = await conversationService.getAll();
    res.json(data);
  },
};
