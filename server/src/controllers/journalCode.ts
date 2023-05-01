import { RequestHandler } from "express";
import JournalCodeModel from "../models/journalCode";

export const create: RequestHandler<
  any,
  any,
  any,
  { code?: string; entitled?: string }
> = async (req, res, next) => {
  const { code, entitled } = req.query;
  try {
    if (code?.length !== 2) {
      throw new Error("Code must be 2 characters long");
    }
    const journalCode = await JournalCodeModel.create({
      code,
      entitled,
    });
    res.status(201).json(journalCode);
  } catch (error) {
    next(error);
  }
};

export const remove: RequestHandler<
  any,
  any,
  any,
  { journalCodeID?: string }
> = async (req, res, next) => {
  const { journalCodeID } = req.query;
  try {
    const journalCode = await JournalCodeModel.findByIdAndDelete({
      _id: journalCodeID,
    }).exec();
    if (!journalCode) {
      throw new Error("JournalCode not found.");
    }
    res.status(201).json(journalCode);
  } catch (error) {
    next(error);
  }
};

export const update: RequestHandler<
  any,
  any,
  any,
  { journalCodeID?: string; code?: string; entitled?: string }
> = async (req, res, next) => {
  const { journalCodeID, code, entitled } = req.query;
  try {
    if (code?.length !== 2) {
      throw new Error("Code must be 2 characters long");
    }
    const journalCode = await JournalCodeModel.findOne({
      _id: journalCodeID,
    }).exec();
    if (!journalCode) {
      throw new Error("JournalCode not found.");
    }
    if (code) {
      journalCode.code = code;
    }
    if (entitled) {
      journalCode.entitled = entitled;
    }
    res.status(201).json(journalCode);
  } catch (error) {
    next(error);
  }
};
