import express from "express";
import * as ThirdPartyChartOfAccountController from "../controllers/thirdPartyChartOfAccount";

// This do not create a new instance of express, but use the one from server.ts
const router = express.Router();

router.post("/create", ThirdPartyChartOfAccountController.create);
router.post("/update", ThirdPartyChartOfAccountController.update);
router.post("/delete", ThirdPartyChartOfAccountController.remove);

export default router;
