import { Document, InferSchemaType, Schema, model } from "mongoose";
import AccountingPeriodModel from "./accountingPeriod";

/* Types */
interface IDetail extends Document {
  generalAccount: string;
  thirdPartyAccount?: string;
  description: string;
  debit?: number;
  credit?: number;
}

interface IJournal extends Document {
  society: Schema.Types.ObjectId;
  date: Date;
  code: Schema.Types.ObjectId;
  reference: Schema.Types.ObjectId;
  refNumber: string;
  details: IDetail[];
}

/* Specific Validators */
const journalDateValidator = async function (this: IJournal, value: Date) {
  const societyID = this.society;
  const accoutingPeriod = await AccountingPeriodModel.findOne(
    { society: societyID },
    {},
    { sort: { endDate: -1 } }
  ).lean();

  if (!accoutingPeriod) {
    return false;
  }

  const { startDate, endDate } = accoutingPeriod;
  return startDate <= value && value <= endDate;
};

const detailsBalanceValidator = function (details: IDetail[]) {
  let totalDebit = 0;
  let totalCredit = 0;

  details.forEach((detail) => {
    totalDebit += detail.debit || 0;
    totalCredit += detail.credit || 0;
  });

  return totalDebit === totalCredit;
};

/* Schema */
const journalSchema = new Schema({
  society: { type: Schema.Types.ObjectId, ref: "Society" },
  date: {
    type: Date,
    required: true,
    validate: {
      validator: journalDateValidator,
      message: "Date must be within the current accounting period",
    },
  },
  code: {
    type: String,
    ref: "JournalCode",
    localField: "code",
    foreignField: "code",
    required: true,
  },
  reference: {
    type: String,
    ref: "ReferenceDocument",
    localField: "reference",
    foreignField: "reference",
    required: true,
  },
  refNumber: { type: String, required: true, minLength: 1, maxLength: 11 },
  details: [
    {
      generalAccount: {
        type: String,
        ref: "ChartOfAccount",
        localField: "generalAccount",
        foreignField: "accountNumber",
        required: true,
      },
      thirdPartyAccount: {
        type: String,
        ref: "ThirdPartyAccount",
        localField: "thirdPartyAccount",
        foreignField: "account",
      },
      description: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 32,
      },
      debit: { type: Number, min: [0, "Value can not be negative"] },
      credit: { type: Number, min: [0, "Value can not be negative"] },
    },
  ],
});
journalSchema.path("details").validate(detailsBalanceValidator);

type Journal = InferSchemaType<typeof journalSchema>;

export default model<Journal>("Journal", journalSchema);
