import express from "express";
const app = express();

import dotenv from "dotenv-safe";
dotenv.config();

import cors from "cors";
app.use(cors());
app.use(express.json());

import db from "./config/database.js";
db.connect();

//definir a rota prinicpal
import routes from "./routes/userRoutes.js";
app.use("/users", routes);

import routes2 from "./routes/clientRoutes.js";
app.use("/clients", routes2);

import routes3 from "./routes/authRoutes.js";
app.use("/auth", routes3);

import contactRoutes from "./routes/contactRoutes.js";
app.use("/clients/contacts", contactRoutes);

export default app;
