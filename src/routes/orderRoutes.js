import express from "express";
const router = express.Router();

import controller from "../controllers/orderController.js";

// READ - leitura de todos os usuários
router.get("/", controller.getOrderAll);

// CREATE - criação de novos usuários
router.post("/", controller.createOrder);

export default router;
