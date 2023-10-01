import express from "express";
const router = express.Router();

import controller from "../controllers/statusController.js";

// READ - leitura de todos os usuários
router.get("/", controller.getStatusAll);
// CREATE - criação de novos usuários
router.post("/", controller.createStatus);

export default router;
