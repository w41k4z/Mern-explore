import { Request, Response } from "express";
import SocietyModel from "../models/society";

export const fetchAll = async (req: Request, res: Response) => {
  const societies = await SocietyModel.find().exec();
  res.status(200).json(societies);
};
