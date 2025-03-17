import { Schema, model } from 'mongoose';
import { IConversation } from './conversation.interface';

const conversationSchema = new Schema<IConversation>(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Conversation = model<IConversation>('Conversation', conversationSchema);

export default Conversation;
