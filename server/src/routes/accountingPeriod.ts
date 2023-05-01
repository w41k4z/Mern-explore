import express from "express";
import * as AccountinPeriodController from "../controllers/accountingPeriod";

// This do not create a new instance of express, but use the one from server.ts
const router = express.Router();

router.post("/create", AccountinPeriodController.create);

export default router;
