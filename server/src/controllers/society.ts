import { RequestHandler } from "express";
import SocietyModel from "../models/society";

export const fetchAll: RequestHandler = async (req, res, next) => {
  try {
    const societies = await SocietyModel.find().exec();
    res.status(200).json(societies);
  } catch (error) {
    next(error);
  }
};
