import express from "express";
const router = express.Router();

import controller from "../controllers/tourController.js";

// READ - leitura de todos os usuários
router.get("/", controller.getTourAll);
// CREATE - criação de novos usuários
router.post("/", controller.createTour);
router.patch("/:tourID", controller.updateTour);

export default router;
