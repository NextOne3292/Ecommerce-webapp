import express from "express";
import { userSignup,userLogin,getProfile } from "../controllers/userControllers.js";
import {userAuth} from  "../middlewares/userAuth.js"
const router = express.Router();

// Signup route
router.post("/signup", userSignup);
// Login route
router.post("/login" , userLogin);
router.get("/profile", userAuth, getProfile);

export default router;