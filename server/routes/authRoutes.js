import express from "express";

import {
  userSignup,
  userLogin,
  logoutUser,
  changePassword,
} from "../controllers/authControllers.js";

import { userAuth } from "../middlewares/userAuth.js";

const router = express.Router();


// signup
router.post("/signup", userSignup);

// login
router.post("/login", userLogin);

// logout (need login)
router.post("/logout", userAuth, logoutUser);

// change password (need login)
router.put("/change-password", userAuth, changePassword);

export default router;