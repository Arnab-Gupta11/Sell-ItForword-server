import { Message } from './message.model';
import { TMessage } from './message.interface';

// Create a message
const createMessage = async (payload: TMessage) => {
  const result = await Message.create(payload);
  return result;
};

// Get all messages
const getAllMessages = async () => {
  const result = await Message.find().sort({ createdAt: -1 });
  return result;
};

// Get a single message by ID
const getSingleMessage = async (id: string) => {
  const result = await Message.findById(id);
  return result;
};

export const MessageServices = {
  createMessage,
  getAllMessages,
  getSingleMessage,
};
