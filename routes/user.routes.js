import express from "express";
import { updateUser } from "../controllers/user.controller.js";

const router = express.Router();

// Route to update user information
router.put("/update", updateUser);

export default router; 