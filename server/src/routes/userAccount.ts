import express from "express";
import * as UserAccountController from "../controllers/userAccount";

// This do not create a new instance of express, but use the one from server.ts
const router = express.Router();

router.get("/sign-in", UserAccountController.signIn);

export default router;
