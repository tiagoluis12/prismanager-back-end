import express from "express";
const router = express.Router();

import controller from "../controllers/contactController.js";

// READ - leitura de todos os usuários
router.get("/", controller.getContactAll);
// CREATE - criação de novos usuários
router.post("/", controller.createContact);

export default router;
