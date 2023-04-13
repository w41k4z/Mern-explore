import express from "express";
import * as SocietyController from "../controllers/society";

// This do not create a new instance of express, but use the one from server.ts
const router = express.Router();

router.get("/fetch", SocietyController.fetchAll);

export default router;
