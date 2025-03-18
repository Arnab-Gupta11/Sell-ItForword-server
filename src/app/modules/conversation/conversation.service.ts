import { IUser } from '../user/user.interface';
import Conversation from './conversation.model';

const getAllConversationOfAUserFromDB = async (user: IUser) => {
  const conversations = await Conversation.find({
    participants: { $in: [user._id] },
  }).populate('participants');
  return conversations;
};

export const ConversationServices = {
  getAllConversationOfAUserFromDB,
};
