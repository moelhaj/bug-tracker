import express from "express";
import * as controller from "./workItems.controller";
import catchAsync from "../../utils/catchAsync";
import { auth } from "../auth/auth.middleware";
import validate from "./workItems.validation";

const router = express.Router();

router.post("/", auth, validate(), catchAsync(controller.create));
router.put("/:id", auth, validate(), catchAsync(controller.update));

export default router;
