import { Router } from "express";
import { register, login, logout, getMe, verifyOtp, resendOtp } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { RegisterSchema, LoginSchema, VerifyOtpSchema, ResendOtpSchema } from "../validators/auth.validator";

const router = Router();

router.post("/register", validate(RegisterSchema), register);
router.post("/verify-otp", validate(VerifyOtpSchema), verifyOtp);
router.post("/resend-otp", validate(ResendOtpSchema), resendOtp);
router.post("/login", validate(LoginSchema), login);
router.post("/logout", logout);
router.get("/me", authenticate, getMe);

export default router;
