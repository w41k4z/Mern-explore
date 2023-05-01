import { RequestHandler } from "express";
import ChartOfAccountModel from "../models/chartOfAccount";
import SocietyModel from "../models/society";

interface createQuery {
  societyID?: string;
  accountNumber?: string;
  entitled?: string;
}
export const create: RequestHandler<any, any, any, createQuery> = async (
  req,
  res,
  next
) => {
  const { societyID, accountNumber, entitled } = req.body;
  try {
    const dbSociety = await SocietyModel.findById(societyID);
    if (!dbSociety) {
      throw new Error("Society not found");
    }
    const chartOfAccount = await ChartOfAccountModel.create({
      accountNumber,
      societyID: dbSociety._id,
      entitled,
    });
    res.status(201).json(chartOfAccount);
  } catch (error) {
    next(error);
  }
};

export const remove: RequestHandler<
  any,
  any,
  any,
  { chartOfAccountID?: string }
> = async (req, res, next) => {
  const { chartOfAccountID } = req.query;
  try {
    const dbChartOfAccount = await ChartOfAccountModel.findByIdAndDelete(
      chartOfAccountID
    );
    if (!dbChartOfAccount) {
      throw new Error("Chart of account not found");
    }
    res.status(200).json(dbChartOfAccount);
  } catch (error) {
    next(error);
  }
};

interface updateQuery {
  chartOfAccountID?: string;
  accountNumber?: string;
  entitled?: string;
}
export const update: RequestHandler<any, any, any, updateQuery> = async (
  req,
  res,
  next
) => {
  const { chartOfAccountID, accountNumber, entitled } = req.query;
  try {
    const dbChartOfAccount = await ChartOfAccountModel.findById(
      chartOfAccountID
    );
    if (!dbChartOfAccount) {
      throw new Error("Chart of account not found");
    }
    if (accountNumber) {
      dbChartOfAccount.accountNumber = accountNumber;
    }
    if (entitled) {
      dbChartOfAccount.entitled = entitled;
    }
    await dbChartOfAccount.save();
    res.status(200).json(dbChartOfAccount);
  } catch (error) {
    next(error);
  }
};
