import { InferSchemaType, Schema, model } from "mongoose";

const currencySchema = new Schema({
  label: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 3,
  },
});

type Currency = InferSchemaType<typeof currencySchema>;

export default model<Currency>("Currency", currencySchema);
