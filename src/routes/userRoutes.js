import express from "express";
const router = express.Router();

import controller from "../controllers/userController.js";

// READ - leitura de todos os usuários
router.get("/", controller.getAllUsers);
router.get("/", controller.getAll);

// CREATE - criação de novos usuários
router.post("/", controller.createUser);

router.patch("/:id", controller.updateUserById);

router.delete("/:id", controller.deleteUserById);

export default router;
