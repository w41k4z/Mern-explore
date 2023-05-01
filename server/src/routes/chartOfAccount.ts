import express from "express";
import * as ChartOfAccountController from "../controllers/chartOfAccount";

// This do not create a new instance of express, but use the one from server.ts
const router = express.Router();

router.post("/create", ChartOfAccountController.create);
router.post("/remove", ChartOfAccountController.remove);
router.post("/update", ChartOfAccountController.update);

export default router;
