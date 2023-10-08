import express from "express";
import * as controller from "./users.controller";
import catchAsync from "../../utils/catchAsync";
import { auth } from "../auth/auth.middleware";

const router = express.Router();

router.get("/", auth, catchAsync(controller.getAll));
router.get("/:id", auth, catchAsync(controller.get));

export default router;
