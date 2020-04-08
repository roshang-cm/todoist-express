import { Router } from "express";
import taskRouter from "./TaskRoutes";

// Init router and path
const router = Router();

// Add sub-routes
router.use("/tasks", taskRouter);

// Export the base-router
export default router;
