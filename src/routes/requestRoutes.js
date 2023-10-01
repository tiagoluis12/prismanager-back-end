import express from "express";
const router = express.Router();

import controller from "../controllers/requestController.js";

// READ - leitura de todos os usuários
router.get("/", controller.getRequestAll);

// CREATE - criação de novos usuários
router.post("/", controller.createRequest);

export default router;
