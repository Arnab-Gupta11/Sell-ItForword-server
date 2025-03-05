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

// const myProfile = async (authUser: IJwtPayload) => {
//   const isUserExists = await User.findById(authUser.userId);
//   if (!isUserExists) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
//   }
//   if (!isUserExists.isActive) {
//     throw new AppError(StatusCodes.BAD_REQUEST, 'User is not active!');
//   }

//   const profile = await Customer.findOne({ user: isUserExists._id });

//   return {
//     ...isUserExists.toObject(),
//     profile: profile || null,
//   };
// };

// const updateProfile = async (
//   payload: Partial<ICustomer>,
//   file: IImageFile,
//   authUser: IJwtPayload,
// ) => {
//   const isUserExists = await User.findById(authUser.userId);

//   if (!isUserExists) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
//   }
//   if (!isUserExists.isActive) {
//     throw new AppError(StatusCodes.BAD_REQUEST, 'User is not active!');
//   }

//   if (file && file.path) {
//     payload.photo = file.path;
//   }

//   const result = await Customer.findOneAndUpdate(
//     { user: authUser.userId },
//     payload,
//     {
//       new: true,
//     },
//   ).populate('user');

//   return result;
// };

// const updateUserStatus = async (userId: string) => {
//   const user = await User.findById(userId);

//   console.log('comes here');
//   if (!user) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'User is not found');
//   }

//   user.isActive = !user.isActive;
//   const updatedUser = await user.save();
//   return updatedUser;
// };

export const UserServices = {
  registerUser,
  getAllUser,
  getUserById,
  // myProfile,
  // updateUserStatus,
  // updateProfile,
};
