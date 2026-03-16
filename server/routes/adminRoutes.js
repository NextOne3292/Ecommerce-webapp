import express from "express";

import {
  getAllUsers,
  getUserById,
  deactivateUserByAdmin,
  activateUserByAdmin
} from "../controllers/adminControllers.js";

import { adminAuth } from "../middlewares/adminAuth.js";

const router = express.Router();

router.get("/users", adminAuth, getAllUsers);

router.get("/users/:id", adminAuth, getUserById);

router.put("/users/deactivate/:id", adminAuth, deactivateUserByAdmin);

router.put("/users/activate/:id", adminAuth, activateUserByAdmin);

export default router;