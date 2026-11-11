import { Router } from "express";
import { getOverviewStats, getUsers, updateUserPermissions } from "../controllers/admin.controller";
import { authenticate, authorize } from "../middleware/auth";

const router = Router();

router.use(authenticate);
router.use(authorize("admin"));

router.get("/overview", getOverviewStats);
router.get("/users", getUsers);
router.patch("/users/:id/permissions", updateUserPermissions);

export default router;

