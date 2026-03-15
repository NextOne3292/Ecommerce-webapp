import express from "express";

import {
  userSignup,
  userLogin,
  getProfile,
  updateProfile,
  logoutUser,
  changePassword,
  getAllUsers,
  deleteUser,
  getUserById,
} from "../controllers/userControllers.js";

import { userAuth } from "../middlewares/userAuth.js";
import { adminAuth } from "../middlewares/adminAuth.js";

const router = express.Router();


// auth
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/logout", userAuth, logoutUser);


// profile
router.get("/profile", userAuth, getProfile);
router.put("/profile", userAuth, updateProfile);
router.put("/change-password", userAuth, changePassword);


// admin
router.get("/all", adminAuth, getAllUsers);
router.get("/:id", adminAuth, getUserById);
router.delete("/:id", adminAuth, deleteUser);


export default router;