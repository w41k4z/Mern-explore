import { RequestHandler } from "express";
import UserAccountModel from "../models/userAccount";
import createHttpError from "http-errors";

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

    const dbUserAccount = await UserAccountModel.findOne({ email: email })
      .select("+password")
      .exec();

    // checking if the user exists
    if (!dbUserAccount) {
      // for security purposes, we don't want to tell the user that the email is not registered
      throw createHttpError(401, "Invalid credentials");
    }

    // checking if the password is correct
    if (dbUserAccount.password !== rawPassword) {
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

interface createQuery {
  name: string;
  firstName?: string;
  birthdate: Date;
  email: string;
  phoneNumber?: string;
  rawPassword: string;
}
export const create: RequestHandler<
  unknown,
  unknown,
  unknown,
  createQuery
> = async (req, res, next) => {
  const { name, firstName, birthdate, email, phoneNumber, rawPassword } =
    req.query;
  try {
    const dbUserAccount = await UserAccountModel.findOne({
      email: email,
    }).exec();

    // checking if the user already exists
    if (dbUserAccount) {
      throw createHttpError(409, "Email already in use");
    }

    const newUserAccount = new UserAccountModel({
      name,
      firstName,
      birthdate: new Date(birthdate),
      email,
      phoneNumber,
      password: rawPassword,
    });

    await newUserAccount.save();

    res.status(201).json(newUserAccount);
  } catch (error) {
    next(error);
  }
};
