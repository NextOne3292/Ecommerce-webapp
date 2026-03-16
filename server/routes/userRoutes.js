import express from "express";

import {
  getProfile,
  updateProfile,
  deactivateAccount,
  reactivateAccount
} from "../controllers/userControllers.js";

import { userAuth } from "../middlewares/userAuth.js";

const router = express.Router();


// profile
router.get("/profile", userAuth, getProfile);

router.put("/profile", userAuth, updateProfile);


// account control
router.put("/deactivate", userAuth, deactivateAccount);

router.put("/reactivate", userAuth, reactivateAccount);


export default router;