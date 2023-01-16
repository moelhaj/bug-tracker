import express from "express";
import authRoutes from "./auth/auth.route";
import dashboardRoutes from "./dashboard/dashboard.route";
import workItemsRoutes from "./workItems/workItems.route";
import projectsRoutes from "./projects/projects.route";
import userRoutes from "./users/users.route";
import notificationsRoutes from "./notifications/notifications.route";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/work-items", workItemsRoutes);
router.use("/projects", projectsRoutes);
router.use("/users", userRoutes);
router.use("/notifications", notificationsRoutes);

export default router;
