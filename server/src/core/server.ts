import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import accountingPeriodRoute from "../routes/accountingPeriod";
import chartOfAccountRoute from "../routes/chartOfAccount";
import journalCodeRoute from "../routes/journalCode";
import referenceDocumentRoute from "../routes/referenceDocument";
import societyRoute from "../routes/society";
import thirdPartyChartOfAccountRoute from "../routes/thirdPartyChartOfAccount";
import userAccountRoute from "../routes/userAccount";
import currencyRoute from "../routes/currency";

import createHttpError, { isHttpError } from "http-errors";

/* I) EXPRESS_SERVER_INIT_SECTION */
const server = express();

/* II) PRE-HANDLERS_SECTION (MIDDLEWARES) */
// sets up express to parse request bodies as JSON
server.use(cors());
server.use(express.json());

/* III) ROUTES_SECTION */
server.use("/api/accounting-period", accountingPeriodRoute);
server.use("/api/chart-of-account", chartOfAccountRoute);
server.use("/api/currency", currencyRoute);
server.use("/api/journal-code", journalCodeRoute);
server.use("/api/reference-document", referenceDocumentRoute);
server.use("/api/society", societyRoute);
server.use("/api/third-party-chart-of-account", thirdPartyChartOfAccountRoute);
server.use("/api/user-account", userAccountRoute);

/* IV) ERROR_HANDLING_SECTION */
// for endpoint not found
server.use((req, res, next) => {
  /*
   * When a request occures, it will go through all the middlewares and routes
   * If it reaches this middleware, it means that no route has been found
   */
  next(createHttpError(404, "Endpoint not found"));
});

// express special error handling requires those parameters even if they are not used.
// It also needs to be the last middleware
const errorHandler =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: unknown, req: Request, res: Response, next: NextFunction) => {
    let errorMessage =
      error instanceof Error ? error.message : "An unknown error has occurred";
    let status = 500;
    if (isHttpError(error)) {
      errorMessage = error.message;
      status = error.status;
    }
    res.status(status).json({ message: errorMessage });
  };
server.use(errorHandler);

export default server;
