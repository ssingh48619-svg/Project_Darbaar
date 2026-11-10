import { Router } from "express";
import { register, login, logout, getMe } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { RegisterSchema, LoginSchema } from "../validators/auth.validator";

const router = Router();

router.post("/register", validate(RegisterSchema), register);
router.post("/login", validate(LoginSchema), login);
router.post("/logout", logout);
router.get("/me", authenticate, getMe);

export default router;

