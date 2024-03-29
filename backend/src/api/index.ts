import express from "express";
import authRoutes from "./auth/auth.route";
import assigned from "./assigned/assigned.route";
import workItemsRoutes from "./workItems/workItems.route";
import storiesRoutes from "./stories/stories.route";
import projectsRoutes from "./projects/projects.route";
import dashboardRoutes from "./dashboard/dashboard.route";
import userRoutes from "./users/users.route";
import notificationsRoutes from "./notifications/notifications.route";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/assigned", assigned);
router.use("/dashboard", dashboardRoutes);
router.use("/items", workItemsRoutes);
router.use("/stories", storiesRoutes);
router.use("/projects", projectsRoutes);
router.use("/users", userRoutes);
router.use("/notifications", notificationsRoutes);

export default router;
