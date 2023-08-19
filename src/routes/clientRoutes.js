import express from "express";
const router = express.Router();

import controller from "../controllers/clientController.js";

// READ - leitura de todos os usuários
router.get("/", controller.getClientAll);

// CREATE - criação de novos usuários
router.post("/", controller.createClient);

//UPDATE 
router.patch("/:id", controller.updateClientById);

//DELETE]
router.patch("/", controller.removeClientById);

export default router;