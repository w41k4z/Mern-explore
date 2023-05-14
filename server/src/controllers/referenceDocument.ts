import { RequestHandler } from "express";
import ReferenceDocumentModel from "../models/referenceDocument";

export const create: RequestHandler<
  any,
  any,
  { reference: string; meaning: string },
  any
> = async (req, res, next) => {
  try {
    const { reference, meaning } = req.body;
    if (reference?.length !== 2) {
      throw new Error("Reference must be 2 characters long");
    }
    const referenceDocument = await ReferenceDocumentModel.create({
      reference,
      meaning,
    });
    res.status(201).json(referenceDocument);
  } catch (error) {
    next(error);
  }
};

export const update: RequestHandler<
  any,
  any,
  { referenceDocumentID: string; reference?: string; meaning?: string },
  any
> = async (req, res, next) => {
  try {
    const { referenceDocumentID, reference, meaning } = req.body;
    if (reference?.length !== 2) {
      throw new Error("Reference must be 2 characters long");
    }
    const referenceDocument = await ReferenceDocumentModel.findById({
      _id: referenceDocumentID,
    }).exec();
    if (!referenceDocument) {
      throw new Error("ReferenceDocument not found.");
    }
    if (reference) {
      referenceDocument.reference = reference;
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
