import { RequestHandler } from "express";
import csvToJson from "csvtojson";
import ReferenceDocumentModel from "../models/referenceDocument";

export const create: RequestHandler<
  any,
  any,
  { societyID: string; reference: string; meaning: string },
  any
> = async (req, res, next) => {
  try {
    const { societyID, reference, meaning } = req.body;
    if (reference.length !== 2) {
      throw new Error("Reference must be 2 characters long");
    }
    const referenceDocument = await ReferenceDocumentModel.create({
      societyID,
      reference,
      meaning,
    });
    res.status(201).json(referenceDocument);
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
      await ReferenceDocumentModel.create({
        societyID: req.body.societyID,
        reference: data.Reference,
        meaning: data.Meaning,
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
  { referenceDocumentID: string; meaning?: string },
  any
> = async (req, res, next) => {
  try {
    const { referenceDocumentID, meaning } = req.body;
    const referenceDocument = await ReferenceDocumentModel.findById({
      _id: referenceDocumentID,
    }).exec();
    if (!referenceDocument) {
      throw new Error("ReferenceDocument not found.");
    }
    if (meaning) {
      referenceDocument.meaning = meaning;
    }
    await referenceDocument.save();
    res.status(201).json(referenceDocument);
  } catch (error) {
    next(error);
  }
};

export const remove: RequestHandler<
  any,
  any,
  { referenceDocumentID: string },
  any
> = async (req, res, next) => {
  try {
    const { referenceDocumentID } = req.body;
    const referenceDocument = await ReferenceDocumentModel.findByIdAndDelete({
      _id: referenceDocumentID,
    }).exec();
    if (!referenceDocument) {
      throw new Error("ReferenceDocument not found.");
    }
    res.status(201).json(referenceDocument);
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
    const codes = await ReferenceDocumentModel.find({
      societyID: societyID,
    })
      .sort("reference")
      .exec();
    res.status(200).json(codes);
  } catch (error) {
    next(error);
  }
};
