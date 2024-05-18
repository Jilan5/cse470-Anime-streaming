import express from "express";

import protectRoute from "../middleware/protectRoute.js";
import { getAllUsers, getUsersForSidebar } from "../controllers/user.controller.js";
import * as profileController from '../controllers/profile.controller.js';

const router = express.Router();
// main app.use("/api/users", userRoutes);

router.get("/", protectRoute, getUsersForSidebar);

router.get("/all",protectRoute,getAllUsers)


export default router;
