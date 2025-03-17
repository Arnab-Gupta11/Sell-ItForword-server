import { Router } from 'express';
import { MessageControllers } from './message.controller';
import auth from '../../middlewares/auth';

const router = Router();

// Define routes
router.post('/:receiverId', auth('user'), MessageControllers.sendMessage);

export const MessageRoutes = router;
