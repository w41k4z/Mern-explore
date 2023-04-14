import { RequestHandler } from "express";
import UserModel from "../models/userAccount";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

interface signUpBody {
  email?: string;
  rawPassword?: string;
}
export const signIn: RequestHandler<
  unknown,
  unknown,
  signUpBody,
  unknown
> = async (req, res, next) => {
  const { email, rawPassword } = req.body;
  try {
    if (!email || !rawPassword) {
      throw createHttpError(
        400,
        "Missing parameter. Please provide email and password"
      );
    }

    const dbUserAccount = await UserModel.findOne({ email: email })
      .select("+password")
      .exec();

    // checking if the user exists
    if (!dbUserAccount) {
      // for security purposes, we don't want to tell the user that the email is not registered
      throw createHttpError(401, "Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(
      rawPassword,
      dbUserAccount.password
    );

    // checking if the password is correct
    if (!passwordMatch) {
      // for security purposes, we don't want to tell the user that the password is wrong
      throw createHttpError(401, "Invalid credentials");
    }

    // destructuring the password from the dbUserAccount
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userAccount } = dbUserAccount;

    res.status(201).json(userAccount);
  } catch (error) {
    next(error);
  }
};
