import { RequestHandler } from "express";

interface signUpBody {
  email?: string;
  password?: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  signUpBody,
  unknown
> = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw createHttpError(400, "Missing parameter");
      // return res.status(400).json({ message: "Missing parameter" });
    }
  } catch (error) {
    next(error);
  }
};

function createHttpError(arg0: number, arg1: string) {
  throw new Error("Function not implemented.");
}
