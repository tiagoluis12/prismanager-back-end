import express from "express";
const router = express.Router();

import controller from "../controllers/userController.js";

// READ - leitura de todos os usuários
router.get("/", controller.getAll);

// CREATE - criação de novos usuários
router.post("/", controller.createUser);

export default router;