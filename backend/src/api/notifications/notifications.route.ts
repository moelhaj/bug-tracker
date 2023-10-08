import express from "express";
import * as controller from "./notifications.controller";
import catchAsync from "../../utils/catchAsync";
import { auth } from "../auth/auth.middleware";

const router = express.Router();

router.get("/", auth, catchAsync(controller.getAll));
router.get("/read/all", auth, catchAsync(controller.readAll));

export default router;
