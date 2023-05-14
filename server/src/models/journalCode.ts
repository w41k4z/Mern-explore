import { InferSchemaType, Schema, model } from "mongoose";

const journalCodeSchema = new Schema({
  societyID: { type: Schema.Types.ObjectId, ref: "Society", required: true },
  code: { type: String, minLength: 2, maxLength: 2, required: true },
  entitled: { type: String, required: true },
});

type JournalCode = InferSchemaType<typeof journalCodeSchema>;

export default model<JournalCode>("JournalCode", journalCodeSchema);
