import { InferSchemaType, Schema, model } from "mongoose";

const userAccountSchema = new Schema({
  name: { type: String, required: true },
  firstName: { type: String },
  birthdate: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  password: { type: String, required: true, select: false },
  societies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Society",
    },
  ],
});

type UserAccount = InferSchemaType<typeof userAccountSchema>;

export default model<UserAccount>("UserAccount", userAccountSchema);
