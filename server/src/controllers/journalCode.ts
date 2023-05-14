import { RequestHandler } from "express";
import csvToJson from "csvtojson";
import JournalCodeModel from "../models/journalCode";

export const create: RequestHandler<
  any,
  any,
  { societyID: string; code: string; entitled: string },
  any
> = async (req, res, next) => {
  try {
    const { societyID, code, entitled } = req.body;
    if (code?.length !== 2) {
      throw new Error("Code must be 2 characters long");
    }
    const journalCode = await JournalCodeModel.create({
      societyID,
      code,
      entitled,
    });
    res.status(201).json(journalCode);
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
      await JournalCodeModel.create({
        societyID: req.body.societyID,
        code: data.Code,
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
  { journalCodeID: string; entitled?: string },
  any
> = async (req, res, next) => {
  try {
    const { journalCodeID, entitled } = req.body;
    const journalCode = await JournalCodeModel.findOne({
      _id: journalCodeID,
    }).exec();
    if (!journalCode) {
      throw new Error("JournalCode not found.");
    }
    if (entitled) {
      journalCode.entitled = entitled;
    }
    res.status(201).json(journalCode);
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
    const codes = await JournalCodeModel.find({
      societyID: societyID,
    })
      .sort("code")
      .exec();
    res.status(200).json(codes);
  } catch (error) {
    next(error);
  }
};
