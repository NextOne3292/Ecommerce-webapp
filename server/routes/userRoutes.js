import express from "express";
import { userSignup,userLogin } from "../controllers/userControllers.js";

const router = express.Router();

// Signup route
router.post("/signup", userSignup);
// Login route
router.post("/login" , userLogin)

export default router;