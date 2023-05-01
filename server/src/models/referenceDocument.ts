import { InferSchemaType, Schema, model } from "mongoose";

const referenceDocumentSchema = new Schema({
  reference: {
    type: String,
    required: true,
    unique: true,
    minLength: 2,
    maxLength: 2,
  },
  meaning: { type: String, required: true },
});

type ReferenceDocument = InferSchemaType<typeof referenceDocumentSchema>;
export default model<ReferenceDocument>(
  "ReferenceDocument",
  referenceDocumentSchema
);
