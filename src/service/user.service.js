import UserModel from "../model/user.model";
import bcrypt from "bcrypt";
import logger from "../utils/logger";

export const createUser = async (input) => {
  try {
    const { username, email, password } = input;
    //  check if user exist
    const isEmailExist = await UserModel.findOne({ email });
    const isUsernameExist = await UserModel.findOne({ username });

    if (isEmailExist || isUsernameExist) {
      throw new Error("user already exist");
    }
    if (password.length < 8) {
      throw new Error("password is short");
    }

    const user = await UserModel(input);
    user.save();
    return {
      username: user.username,
      email: user.email,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginUser = async (input) => {
  try {
    const { email, password } = input;
    //  check if user exist
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("User doesn't exist");
    }
    //  compare passwords
    const isEqual = await user.comparePassword(password);
    if (!isEqual) {
      throw new Error("Invalid credentials");
    }
    return {
      username: user.username,
      email: user.email,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
