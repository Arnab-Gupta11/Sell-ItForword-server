import mongoose from 'mongoose';
import { IUser, userDataPayload } from './user.interface';
import User from './user.model';
import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { UserSearchableFields } from './user.constant';

// Function to register user
const registerUser = async (payload: userDataPayload) => {
  const { fullName, email, password, confirmedPassword } = payload;
  // Check if all required fields are provided
  if (!fullName || !email || !password || !confirmedPassword) {
    throw new AppError(
      400,
      'All fields (Full Name, Email, Password, Confirmed Password) are required.',
    );
  }
  // Check if password and password_confirmation match
  if (password !== confirmedPassword) {
    throw new AppError(
      400,
      'Passwords do not match. Please ensure both password fields are identical.',
    );
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Check if the user already exists by email
    const existingUser = await User.findOne({ email: payload.email }).session(
      session,
    );
    if (existingUser) {
      throw new AppError(
        406,
        'A user with this email already exists. Please try logging in or use a different email.',
      );
    }

    //New user Data.
    const userData = {
      fullName,
      email,
      password,
      image: `https://avatar.iran.liara.run/username?username=${fullName}&bold=false&length=1`,
    };

    // Create the user
    const user = new User(userData);
    const createdUser = await user.save({ session });

    await session.commitTransaction();
    return createdUser;
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllUser = async (query: Record<string, unknown>) => {
  const UserQuery = new QueryBuilder(User.find(), query)
    .search(UserSearchableFields)
    .paginate();

  const result = await UserQuery.modelQuery;
  const meta = await UserQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getUserById = async (userId: string, loginUser: IUser) => {
  const user = await User.findById(userId).select('-password');
  if (loginUser.email !== user?.email) {
    throw new AppError(403, 'You are not authorized to access.');
  }
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const updateUserProfileIntoDB = async (
  userId: string,
  updateData: Partial<IUser>,
  loginUser: IUser,
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  if (loginUser.role === 'user' && loginUser.email !== user.email) {
    throw new AppError(400, 'You are not authorized To update this profile.');
  }
  const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  }).select('-password');

  return updatedUser;
};

export const UserServices = {
  registerUser,
  getAllUser,
  getUserById,
  updateUserProfileIntoDB,
};
