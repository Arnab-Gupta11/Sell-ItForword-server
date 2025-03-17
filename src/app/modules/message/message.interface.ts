import { ObjectId } from 'mongoose';

export interface IMessage {
  conversationId: ObjectId;
  senderId: ObjectId;
  receiverId: ObjectId;
  text: string;
  image: string;
}
