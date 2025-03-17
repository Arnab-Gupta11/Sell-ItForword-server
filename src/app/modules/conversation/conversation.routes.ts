import { Router } from 'express';
import { conversationController } from './conversation.controller';

const router = Router();

// Define routes
router.get('/', conversationController.getAll);

export default router;
