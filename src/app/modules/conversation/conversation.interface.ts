import { ObjectId } from 'mongoose';

export interface IConversation {
  participants: ObjectId[];
  isBlocked: boolean;
}
