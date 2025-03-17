import Conversation from '../conversation/conversation.model';
import { IUser } from '../user/user.interface';
import { IMessage } from './message.interface';
import Message from './message.model';

const sendMessage = async (
  user: IUser,
  receiver: string,
  payload: Partial<IMessage>,
) => {
  //Check any conversation exist between this users.
  let conversation;
  conversation = await Conversation.findOne({
    participants: { $all: [user._id, receiver] },
  });
  //If Conversation not exist create conversation.
  if (!conversation) {
    conversation = await Conversation.create({
      participants: [user._id, receiver],
    });
  }

  //Create Message
  const newMessage = {
    senderId: user._id,
    receiverId: receiver,
    conversationId: conversation._id,
    ...payload,
  };
  const result = await Message.create(newMessage);
  return result;
};

export const MessageServices = {
  sendMessage,
};
