import express from "express";
import * as JournalCodeController from "../controllers/journalCode";

// This do not create a new instance of express, but use the one from server.ts
const router = express.Router();

router.post("/create", JournalCodeController.create);
router.post("/update", JournalCodeController.update);
router.post("/delete", JournalCodeController.remove);

export default router;
