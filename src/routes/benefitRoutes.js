import express from "express";
const router = express.Router();

import controller from "../controllers/benefitController.js";

// READ - leitura de todos os usuários
router.get("/", controller.getBenefitAll);
// CREATE - criação de novos usuários
router.post("/", controller.createBenefit);

export default router;
