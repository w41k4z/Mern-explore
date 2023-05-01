import { RequestHandler } from "express";
import SocietyModel from "../models/society";
import ThirdPartyChartOfAccountModel from "../models/thirdPartyChartOfAccount";

export const create: RequestHandler<
  any,
  any,
  any,
  { societyID?: string; type?: string; account?: string; entitled?: string }
> = async (req, res, next) => {
  const { societyID, type, account, entitled } = req.query;
  try {
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

export const update: RequestHandler<
  any,
  any,
  any,
  {
    thirdPartyChartOfAccountID?: string;
    societyID?: string;
    type: string;
    account: string;
    entitled?: string;
  }
> = async (req, res, next) => {
  const { thirdPartyChartOfAccountID, societyID, type, account, entitled } =
    req.query;
  try {
    const dbSociety = await SocietyModel.findById(societyID).exec();
    if (!dbSociety) {
      throw new Error("Society not found.");
    }
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
    if (account) {
      thirdPartyChartOfAccount.account = account;
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
  any,
  { thirdPartyChartOfAccountID?: string }
> = async (req, res, next) => {
  const { thirdPartyChartOfAccountID } = req.query;
  try {
    const thirdPartyChartOfAccount =
      await ThirdPartyChartOfAccountModel.findByIdAndDelete({
        _id: thirdPartyChartOfAccountID,
      }).exec();
    if (!thirdPartyChartOfAccount) {
      throw new Error("ThirdPartyChartOfAccount not found.");
    }
    res.status(201).json(thirdPartyChartOfAccount);
  } catch (error) {
    next(error);
  }
};
