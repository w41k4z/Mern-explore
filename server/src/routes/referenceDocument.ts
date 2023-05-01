import express from "express";
import * as ReferenceDocumentController from "../controllers/referenceDocument";

// This do not create a new instance of express, but use the one from server.ts
const router = express.Router();

router.post("/create", ReferenceDocumentController.create);
router.post("/update", ReferenceDocumentController.update);
router.post("/delete", ReferenceDocumentController.remove);

export default router;
