import express from "express";
import * as controller from "./auth.controller";
import catchAsync from "../../utils/catchAsync";

const router = express.Router();

router.post("/login", catchAsync(controller.login));
router.post("/register", catchAsync(controller.register));

export default router;
