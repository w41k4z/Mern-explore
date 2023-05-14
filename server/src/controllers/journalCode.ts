import { RequestHandler } from "express";
import JournalCodeModel from "../models/journalCode";

export const create: RequestHandler<
  any,
  any,
  { code: string; entitled: string },
  any
> = async (req, res, next) => {
  try {
    const { code, entitled } = req.body;
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
  { journalCodeID: string },
  any
> = async (req, res, next) => {
  try {
    const { journalCodeID } = req.body;
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
  { journalCodeID: string; code?: string; entitled?: string },
  any
> = async (req, res, next) => {
  try {
    const { journalCodeID, code, entitled } = req.body;
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
