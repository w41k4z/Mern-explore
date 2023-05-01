import { InferSchemaType, Schema, model } from "mongoose";

const journalCode = new Schema({
  code: { type: String, minLength: 2, maxLength: 2, required: true },
  entitled: { type: String, required: true },
});

type JournalCode = InferSchemaType<typeof journalCode>;

export default model<JournalCode>("JournalCode", journalCode);
