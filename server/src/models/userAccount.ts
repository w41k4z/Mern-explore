import { InferSchemaType, Schema, model } from "mongoose";
import { passwordValidator } from "../utils/modelValidators";

const userAccountSchema = new Schema({
  name: { type: String, required: true },
  firstName: { type: String },
  birthdate: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
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
});

type UserAccount = InferSchemaType<typeof userAccountSchema>;

export default model<UserAccount>("UserAccount", userAccountSchema);
