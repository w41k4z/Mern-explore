import { RequestHandler } from "express";
import JournalModel from "../models/journal";
import SocietyModel from "../models/society";
import csvToJson from "csvtojson";
import createHttpError from "http-errors";

interface createBody {
  societyID: string;
  date: Date;
  code: string;
  reference: string;
  refNumber: string;
  description: string;
  details: string;
  isClosed: boolean;
}
export const create: RequestHandler<any, any, createBody, any> = async (
  req,
  res,
  next
) => {
  try {
    const {
      societyID,
      date,
      code,
      reference,
      refNumber,
      description,
      details,
    } = req.body;
    const dbSociety = await SocietyModel.findById(societyID);
    console.log(req.body);
    if (!dbSociety) {
      throw new Error("Society not found");
    }
    const realDetails = JSON.parse(details);
    const newJournal = await JournalModel.create({
      societyID: dbSociety._id,
      date,
      code,
      reference,
      refNumber,
      description,
      details: realDetails,
    });
    res.status(201).json(newJournal);
  } catch (error) {
    next(error);
  }
};

export const upload: RequestHandler = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error("No file uploaded");
    }
    const filePath = req.file.path;
    const jsonArray = await csvToJson({ delimiter: [";"] }).fromFile(filePath);
    const dateString = jsonArray[0].Date;
    const [day, month, year] = dateString.split("/");
    const journal = new JournalModel({
      societyID: req.body.societyID,
      date: new Date(year, month - 1, day),
      code: jsonArray[0].Code,
      reference: jsonArray[0].Reference,
      refNumber: jsonArray[0].RefNumber,
      description: jsonArray[0].Description,
      details: [],
    });
    jsonArray.map((data: any) => {
      journal.details.push({
        generalAccount: data.GeneralChartOfAccount,
        thirdPartyAccount: data.ThirdPartyAccount,
        debit: data.Debit,
        credit: data.Credit,
      });
    });
    await journal.save();
    res.send("File uploaded and processed");
  } catch (error) {
    next(error);
  }
};

// export const remove: RequestHandler<
//   any,
//   any,
//   { chartOfAccountID: string },
//   any
// > = async (req, res, next) => {
//   try {
//     const { chartOfAccountID } = req.body;
//     const dbChartOfAccount = await ChartOfAccountModel.findByIdAndDelete(
//       chartOfAccountID
//     );
//     if (!dbChartOfAccount) {
//       throw new Error("Chart of account not found");
//     }
//     res.status(200).json(dbChartOfAccount);
//   } catch (error) {
//     next(error);
//   }
// };

// interface updateBody {
//   chartOfAccountID: string;
//   entitled: string;
// }
// export const update: RequestHandler<any, any, updateBody, any> = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const { chartOfAccountID, entitled } = req.body;
//     const dbChartOfAccount = await ChartOfAccountModel.findById(
//       chartOfAccountID
//     );
//     if (!dbChartOfAccount) {
//       throw new Error("Chart of account not found");
//     }
//     if (entitled) {
//       dbChartOfAccount.entitled = entitled;
//     }
//     await dbChartOfAccount.save();
//     res.status(200).json(dbChartOfAccount);
//   } catch (error) {
//     next(error);
//   }
// };

// export const fetchBySocietyID: RequestHandler<
//   any,
//   any,
//   { societyID: string },
//   any
// > = async (req, res, next) => {
//   try {
//     const { societyID } = req.body;
//     const chartOfAccounts = await ChartOfAccountModel.find({
//       societyID: societyID,
//     })
//       .sort("accountNumber")
//       .exec();
//     res.status(200).json(chartOfAccounts);
//   } catch (error) {
//     next(error);
//   }
// };
