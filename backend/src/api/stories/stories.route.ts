import express from "express";
import * as controller from "./stories.controller";
import catchAsync from "../../utils/catchAsync";
import { auth } from "../auth/auth.middleware";
import validate from "./stories.validation";

const router = express.Router();

router.get("/", auth, catchAsync(controller.getAll));
router.get("/:id", auth, catchAsync(controller.get));
router.post("/", auth, validate(), catchAsync(controller.create));
router.put("/:id", auth, validate(), catchAsync(controller.update));

export default router;
