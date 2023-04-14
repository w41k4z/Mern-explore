import { InferSchemaType, Schema, model } from "mongoose";

const societySchema = new Schema({
  name: { type: String, required: true },
  ceo: { type: Schema.Types.ObjectId, ref: "UserAccount" },
  logo: { type: String },
  password: { type: String, required: true, select: false },
  object: { type: String, required: true },
  address: { type: String, required: true },
  headquarters: { type: String, required: true },
  creationDate: { type: Date, required: true },
  taxIdentificationNumber: { type: String },
  staticalNumber: { type: String },
  commercialRegisterNumber: { type: String },
  status: { type: String },
  startDateOfAccountingPeriod: { type: Date, required: true },
});

type Society = InferSchemaType<typeof societySchema>;

export default model<Society>("Society", societySchema);
