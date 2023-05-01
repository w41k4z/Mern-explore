import express from "express";
import * as UserAccountController from "../controllers/userAccount";

// This do not create a new instance of express, but use the one from server.ts
const router = express.Router();

router.post("/sign-in", UserAccountController.signIn);
router.post("/create", UserAccountController.create);

export default router;
