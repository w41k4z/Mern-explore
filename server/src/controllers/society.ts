import { RequestHandler } from "express";
import SocietyModel from "../models/society";

export const authenticate: RequestHandler<
  any,
  any,
  { societyID?: string; password?: string },
  any
> = async (req, res, next) => {
  const { societyID, password } = req.body;
  try {
    if (!societyID || !password) {
      throw new Error("Missing parameter.");
    }
    const dbSociety = await SocietyModel.findOne({
      _id: societyID,
      password: password,
    })
      .select("+password")
      .exec();
    if (!dbSociety) {
      throw new Error("Invalid credentials.");
    }
    res.status(200).json(dbSociety);
  } catch (error) {
    next(error);
  }
};

interface updateQuery {
  societyID?: string;
  name?: string;
  logo?: string;
  password?: string;
  address?: string;
  headquarters?: string;
  taxIdentificationNumber?: string;
  statisticalNumber?: string;
  commercialRegisterNumber?: string;
  status?: string;
}
export const update: RequestHandler<any, any, any, updateQuery> = async (
  req,
  res,
  next
) => {
  const {
    societyID,
    name,
    logo,
    password,
    address,
    headquarters,
    taxIdentificationNumber,
    statisticalNumber,
    commercialRegisterNumber,
    status,
  } = req.query;
  try {
    const dbSociety = await SocietyModel.findOne({ _id: societyID }).exec();
    if (!dbSociety) {
      throw new Error("Society not found.");
    }
    if (name) {
      dbSociety.name = name;
    }
    if (logo) {
      dbSociety.logo = logo;
    }
    if (password) {
      dbSociety.password = password;
    }
    if (address) {
      dbSociety.address = address;
    }
    if (headquarters) {
      dbSociety.headquarters = headquarters;
    }
    if (taxIdentificationNumber) {
      dbSociety.taxIdentificationNumber = taxIdentificationNumber;
    }
    if (statisticalNumber) {
      dbSociety.statisticalNumber = statisticalNumber;
    }
    if (commercialRegisterNumber) {
      dbSociety.commercialRegisterNumber = commercialRegisterNumber;
    }
    if (status) {
      dbSociety.status = status;
    }
    await dbSociety.save();
    res.status(201).json(dbSociety);
  } catch (error) {
    next(error);
  }
};

interface createQuery {
  name?: string;
  ceo?: string;
  logo?: string;
  password?: string;
  object?: string;
  address?: string;
  headquarters?: string;
  creationDate?: Date;
  taxIdentificationNumber?: string;
  statisticalNumber?: string;
  commercialRegisterNumber?: string;
  status?: string;
  startDateOfAccountingPeriod?: Date;
  accountingCurrency?: string;
}
export const create: RequestHandler<any, any, any, createQuery> = async (
  req,
  res,
  next
) => {
  const {
    name,
    ceo,
    logo,
    password,
    object,
    address,
    headquarters,
    creationDate,
    taxIdentificationNumber,
    statisticalNumber,
    commercialRegisterNumber,
    status,
    startDateOfAccountingPeriod,
    accountingCurrency,
  } = req.query;
  try {
    const society = new SocietyModel({
      name,
      ceo,
      logo,
      password,
      object,
      address,
      headquarters,
      creationDate,
      taxIdentificationNumber,
      statisticalNumber,
      commercialRegisterNumber,
      status,
      startDateOfAccountingPeriod,
      accountingCurrency,
    });
    await society.save();
    res.status(201).json(society);
  } catch (error) {
    next(error);
  }
};
