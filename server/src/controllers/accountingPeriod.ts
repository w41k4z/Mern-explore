import { RequestHandler } from "express";
import AccountingPeriodModel from "../models/accountingPeriod";
import SocietyModel from "../models/society";

interface createQuery {
  societyID?: string;
  startDate?: Date;
}
export const create: RequestHandler<any, any, any, createQuery> = async (
  req,
  res,
  next
) => {
  const { societyID, startDate } = req.body;
  const endDate = new Date(
    startDate.getFullYear() + 1,
    startDate.getMonth(),
    startDate.getDate() - 1
  );
  try {
    const dbSociety = await SocietyModel.findById(societyID);
    if (!dbSociety) {
      throw new Error("Society not found");
    }
    const accountingPeriod = await AccountingPeriodModel.create({
      society: dbSociety._id,
      startDate,
      endDate,
    });
    res.status(201).json(accountingPeriod);
  } catch (error) {
    next(error);
  }
};
