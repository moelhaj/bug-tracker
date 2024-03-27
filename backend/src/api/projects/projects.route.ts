import express from "express";
import * as controller from "./projects.controller";
import catchAsync from "../../utils/catchAsync";
import { auth, admin } from "../auth/auth.middleware";
import validate from "./projects.validation";

const router = express.Router();

router.get("/", auth, catchAsync(controller.getAll));
router.get("/:id", auth, catchAsync(controller.get));
router.post("/", auth, admin, validate(), catchAsync(controller.create));
router.put("/:id", auth, admin, validate(), catchAsync(controller.update));

export default router;
