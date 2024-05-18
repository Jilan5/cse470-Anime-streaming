import express from "express";
import * as profileController from '../controllers/profile.controller.js';

const router = express.Router();

router.get("/:userId",  profileController.getUser);
router.put("/:userId",  profileController.updateUser);
router.get("/orders/:userId",  profileController.getOrdersByUserid);

export default router;