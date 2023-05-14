import { RequestHandler } from "express";
import CurrencyModel from "../models/currency";

export const create: RequestHandler<any, any, { label: string }, any> = async (
  req,
  res,
  next
) => {
  try {
    const { label } = req.body;
    if (label?.length !== 3) {
      throw new Error("Label must be 3 characters long");
    }
    const currency = await CurrencyModel.create({ label });
    res.status(201).json(currency);
  } catch (error) {
    next(error);
  }
};

export const remove: RequestHandler<
  any,
  any,
  { currencyID: string },
  any
> = async (req, res, next) => {
  try {
    const { currencyID } = req.body;
    const currency = await CurrencyModel.findByIdAndDelete({
      _id: currencyID,
    }).exec();
    if (!currency) {
      throw new Error("Currency not found.");
    }
    res.status(201).json(currency);
  } catch (error) {
    next(error);
  }
};

export const update: RequestHandler<
  any,
  any,
  {
    currencyID: string;
    label: string;
  },
  any
> = async (req, res, next) => {
  try {
    const { currencyID, label } = req.query;
    const dbCurrency = await CurrencyModel.findOne({ _id: currencyID }).exec();
    if (!dbCurrency) {
      throw new Error("Currency not found.");
    }
    if (label) {
      dbCurrency.label = label;
    }
    await dbCurrency.save();
    res.status(201).json(dbCurrency);
  } catch (error) {
    next(error);
  }
};
