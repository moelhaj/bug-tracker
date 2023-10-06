import express from "express";
import * as controller from "./expense.controller";
import catchAsync from "../../utils/catchAsync";
import { auth } from "../auth/auth.middleware";
import validate from "./expense.validation";

const router = express.Router();

router.get("/", auth, catchAsync(controller.getAll));
router.get("/:id", auth, catchAsync(controller.get));
router.post("/", auth, validate(), catchAsync(controller.create));
router.put("/:id", auth, catchAsync(controller.update));
router.delete("/:id", auth, catchAsync(controller.remove));
router.post("/filter", auth, catchAsync(controller.filter));

export default router;
