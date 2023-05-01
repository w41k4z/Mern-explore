import { RequestHandler } from "express";
import ReferenceDocumentModel from "../models/referenceDocument";

export const create: RequestHandler<
  any,
  any,
  any,
  { reference?: string; meaning?: string }
> = async (req, res, next) => {
  const { reference, meaning } = req.query;
  try {
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
  any,
  { referenceDocumentID?: string; reference?: string; meaning?: string }
> = async (req, res, next) => {
  const { referenceDocumentID, reference, meaning } = req.query;
  try {
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
  any,
  { referenceDocumentID?: string }
> = async (req, res, next) => {
  const { referenceDocumentID } = req.query;
  try {
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
