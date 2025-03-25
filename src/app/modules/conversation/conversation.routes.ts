import { Router } from 'express';
import { ConversationControllers } from './conversation.controller';
import auth from '../../middlewares/auth';

const router = Router();

// Define routes
router.get(
  '/',
  auth('user'),
  ConversationControllers.getAllConversationOfAUser,
);

export const ConversationRoutes = router;
