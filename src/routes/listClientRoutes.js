import express from "express";
const router = express.Router();

import controller from "../controllers/listClientController.js";

// READ - leitura de todos os usuários
router.get("/", controller.getListClientAll);
// CREATE - criação de novos usuários
router.post("/", controller.createListClient);

export default router;
