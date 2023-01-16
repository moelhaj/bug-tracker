import express from "express";
import * as controller from "./auth.controller";
import catchAsync from "../../utils/catchAsync";

const router = express.Router();

router.get("/refresh", catchAsync(controller.refresh));
router.post("/login", catchAsync(controller.login));
router.get("/verify", catchAsync(controller.verify));
router.post("/logout", catchAsync(controller.logout));

export default router;
