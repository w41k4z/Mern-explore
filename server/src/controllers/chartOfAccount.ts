import { RequestHandler, response } from "express";
import ChartOfAccountModel from "../models/chartOfAccount";
import SocietyModel from "../models/society";
import csvToJson from "csvtojson";
import createHttpError from "http-errors";

interface createBody {
  societyID?: string;
  accountNumber?: string;
  entitled?: string;
}
export const create: RequestHandler<any, any, createBody, any> = async (
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

export const upload: RequestHandler = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error("No file uploaded");
    }
    const filePath = req.file.path;
    const jsonArray = await csvToJson({ delimiter: [";"] }).fromFile(filePath);

    jsonArray.map(async (data: any) => {
      await ChartOfAccountModel.create({
        accountNumber: data.AccountNumber,
        societyID: req.body.societyID,
        entitled: data.Entitled,
      });
    });

    res.send("File uploaded and processed");
  } catch (error) {
    next(error);
  }
};

export const remove: RequestHandler<
  any,
  any,
  { chartOfAccountID?: string },
  any
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

interface updateBody {
  chartOfAccountID?: string;
  accountNumber?: string;
  entitled?: string;
}
export const update: RequestHandler<any, any, updateBody, any> = async (
  req,
  res,
  next
) => {
  const { chartOfAccountID, accountNumber, entitled } = req.body;
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

export const fetchBySocietyID: RequestHandler<
  any,
  any,
  { societyID: string },
  any
> = async (req, res, next) => {
  const { societyID } = req.body;
  try {
    const chartOfAccounts = await ChartOfAccountModel.find({
      societyID: societyID,
    }).exec();
    if (!chartOfAccounts) {
      throw createHttpError(404, "Society not found");
    }
    res.status(200).json(chartOfAccounts);
  } catch (error) {
    next(error);
  }
};
