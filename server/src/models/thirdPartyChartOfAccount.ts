import { InferSchemaType, Schema, model } from "mongoose";

const thirdPartyChartOfAccountSchema = new Schema({
  societyID: { type: Schema.Types.ObjectId, ref: "Society" },
  type: {
    type: String,
    enum: ["CL", "FO"],
    required: true,
  },
  account: { type: String, required: true },
  entitled: { type: String },
});

type ThirdPartyChartOfAccount = InferSchemaType<
  typeof thirdPartyChartOfAccountSchema
>;

export default model<ThirdPartyChartOfAccount>(
  "ChartOfAccount",
  thirdPartyChartOfAccountSchema
);
