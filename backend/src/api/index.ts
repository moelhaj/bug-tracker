import express from "express";
import authRoutes from "./auth/auth.route";
import expensesRoutes from "./expenses/expense.route";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/expenses", expensesRoutes);

export default router;
