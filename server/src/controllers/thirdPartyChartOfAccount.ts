import { RequestHandler } from "express";
import SocietyModel from "../models/society";
import createHttpError from "http-errors";
import csvToJson from "csvtojson";
import ThirdPartyChartOfAccountModel from "../models/thirdPartyChartOfAccount";

export const create: RequestHandler<
  any,
  any,
  { societyID: string; type: string; account: string; entitled: string },
  any
> = async (req, res, next) => {
  try {
    const { societyID, type, account, entitled } = req.body;
    const dbSociety = await SocietyModel.findById(societyID).exec();
    if (!dbSociety) {
      throw new Error("Society not found.");
    }
    const thirdPartyChartOfAccount = await ThirdPartyChartOfAccountModel.create(
      {
        societyID,
        type,
        account,
        entitled,
      }
    );
    res.status(201).json(thirdPartyChartOfAccount);
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
      await ThirdPartyChartOfAccountModel.create({
        societyID: req.body.societyID,
        type: data.Type,
        account: data.Account,
        entitled: data.Entitled,
      });
    });

    res.send("File uploaded and processed");
  } catch (error) {
    next(error);
  }
};

export const update: RequestHandler<
  any,
  any,
  {
    thirdPartyChartOfAccountID: string;
    type: string;
    entitled?: string;
  },
  any
> = async (req, res, next) => {
  try {
    const { thirdPartyChartOfAccountID, type, entitled } = req.body;
    const thirdPartyChartOfAccount =
      await ThirdPartyChartOfAccountModel.findById({
        _id: thirdPartyChartOfAccountID,
      }).exec();
    if (!thirdPartyChartOfAccount) {
      throw new Error("ThirdPartyChartOfAccount not found.");
    }
    if (type) {
      thirdPartyChartOfAccount.type = type;
    }
    if (entitled) {
      thirdPartyChartOfAccount.entitled = entitled;
    }
    await thirdPartyChartOfAccount.save();
    res.status(201).json(thirdPartyChartOfAccount);
  } catch (error) {
    next(error);
  }
};

export const remove: RequestHandler<
  any,
  any,
  { thirdPartyChartOfAccountID: string },
  any
> = async (req, res, next) => {
  try {
    const { thirdPartyChartOfAccountID } = req.body;
    const thirdPartyChartOfAccount =
      await ThirdPartyChartOfAccountModel.findByIdAndDelete({
        _id: thirdPartyChartOfAccountID,
      }).exec();
    if (!thirdPartyChartOfAccount) {
      throw createHttpError(404, "ThirdPartyChartOfAccount not found.");
    }
    res.status(201).json(thirdPartyChartOfAccount);
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
  try {
    const { societyID } = req.body;
    const thirdPartyChartOfAccounts = await ThirdPartyChartOfAccountModel.find({
      societyID: societyID,
    })
      .sort("type")
      .exec();
    res.status(200).json(thirdPartyChartOfAccounts);
  } catch (error) {
    next(error);
  }
};
