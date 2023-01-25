import express from "express";
import * as controller from "./assigned.controller";
import catchAsync from "../../utils/catchAsync";
import { auth } from "../auth/auth.middleware";

const router = express.Router();

router.get("/", auth, catchAsync(controller.getAll));

export default router;
