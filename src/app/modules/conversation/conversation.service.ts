import { IUser } from '../user/user.interface';
import Conversation from './conversation.model';

const getAllConversationOfAUserFromDB = async (user: IUser) => {
  const conversations = await Conversation.find({
    participants: { $in: [user._id] },
  }).populate({ path: 'participants', select: '_id fullName email image' });

  return conversations;
};

export const ConversationServices = {
  getAllConversationOfAUserFromDB,
};
