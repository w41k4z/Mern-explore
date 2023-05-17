import { Document, InferSchemaType, Schema, model } from "mongoose";

interface IAccountingPeriod extends Document {
  society: Schema.Types.ObjectId;
  startDate: Date;
  endDate?: Date;
}

const accountingPeriodSchema = new Schema({
  societyID: { type: Schema.Types.ObjectId, ref: "Society" },
  startDate: { type: Date, required: true },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (this: IAccountingPeriod, value: Date) {
        return value > this.startDate;
      },
      message: "End date must be after start date",
    },
  },
});

type AccountingPeriod = InferSchemaType<typeof accountingPeriodSchema>;

export default model<AccountingPeriod>(
  "AccountingPeriod",
  accountingPeriodSchema
);
