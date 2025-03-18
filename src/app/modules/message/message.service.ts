/* eslint-disable @typescript-eslint/no-explicit-any */
import { startSession } from 'mongoose';
import AppError from '../../errors/AppError';
import Conversation from '../conversation/conversation.model';
import { IUser } from '../user/user.interface';
import { IMessage } from './message.interface';
import Message from './message.model';

const sendMessage = async (
  user: IUser,
  receiverId: string,
  payload: Partial<IMessage>,
) => {
  //check text or image exist in message.
  if (!payload.text && !payload.image) {
    throw new AppError(400, 'Message must contain either text or an image.');
  }

  // Start a transaction for atomicity
  const session = await startSession(); //start session.
  session.startTransaction(); //strat transaction.

  try {
    // Find or create conversation using `findOneAndUpdate` with `upsert: true`
    let conversation = await Conversation.findOne(
      {
        participants: { $all: [user._id, receiverId] },
      },
      null,
      { session },
    );
    if (!conversation) {
      conversation = new Conversation({
        participants: [user._id, receiverId],
      });
      await conversation.save({ session });
    }
    //Create Message
    const newMessage = {
      senderId: user._id,
      receiverId,
      conversationId: conversation._id,
      ...payload,
    };
    const result = await Message.create([newMessage], { session });
    if (!result) {
      throw new AppError(500, 'Failed to save message in database');
    }

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    return result[0]; // Since create() with an array returns an array
  } catch (error: any) {
    // Rollback transaction on failure
    await session.abortTransaction();
    session.endSession();
    throw new AppError(500, error.message || 'Message sending failed');
  }
};

export const MessageServices = {
  sendMessage,
};
