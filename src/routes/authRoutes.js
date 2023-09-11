import express from "express";
const router = express.Router();

import controller from "../controllers/authController.js";

router.post("/login", controller.login);

router.post("/logout", controller.logout);

export default router;
