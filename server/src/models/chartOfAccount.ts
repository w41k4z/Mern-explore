import { InferSchemaType, Schema, model } from "mongoose";

const chartOfAccountSchema = new Schema({
  accountNumber: { type: String, required: true, length: 5 },
});

type ChartOfAccount = InferSchemaType<typeof chartOfAccountSchema>;

export default model<ChartOfAccount>("ChartOfAccount", chartOfAccountSchema);
