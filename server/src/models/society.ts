import { InferSchemaType, Schema, model } from "mongoose";
import { passwordValidator } from "../utils/modelValidators";

const societySchema = new Schema({
  name: { type: String, required: true },
  ceo: { type: Schema.Types.ObjectId, ref: "UserAccount" },
  logo: { type: String },
  password: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator: passwordValidator,
      message:
        "Password must contain at least a lowercase letter, a uppercase letter, a number and no special characters or spaces",
    },
  },
  object: { type: String, required: true },
  address: { type: String, required: true },
  headquarters: { type: String, required: true },
  creationDate: { type: Date, required: true },
  taxIdentificationNumber: { type: String },
  statisticalNumber: { type: String },
  commercialRegisterNumber: { type: String },
  status: { type: String },
  startDateOfAccountingPeriod: { type: Date, required: true },
  accountingCurrency: { type: Schema.Types.ObjectId, ref: "Currency" },
  equivalentCurrencies: [
    {
      currencyID: { type: Schema.Types.ObjectId, ref: "Currency" },
      value: { type: Number, required: true },
    },
  ],
});

type Society = InferSchemaType<typeof societySchema>;

export default model<Society>("Society", societySchema);
