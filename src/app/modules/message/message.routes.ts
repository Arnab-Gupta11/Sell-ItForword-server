import express from 'express';
import { MessageControllers } from './message.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/', MessageControllers.createMessage);
router.get('/', auth('admin'), MessageControllers.getAllMessages);
router.get('/:id', MessageControllers.getSingleMessage);

export const MessageRoutes = router;
