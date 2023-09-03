import express from "express";
import * as controller from "./auth.controller";
import catchAsync from "../../utils/catchAsync";
import validate from "../users/user.validation";

const router = express.Router();

router.post("/login", catchAsync(controller.login));
router.post("/register", validate(), catchAsync(controller.register));
router.post("/forget-password", catchAsync(controller.sendForgetPasswordEmail));
router.post("/reset-password", catchAsync(controller.resetPassword));
router.post("/verify-token", catchAsync(controller.verifyToken));

export default router;
