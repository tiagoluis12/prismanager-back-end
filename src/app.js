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

import clientRoute from "./routes/clientRoutes.js";
app.use("/listClients/clients", clientRoute);

import routes3 from "./routes/authRoutes.js";
app.use("/auth", routes3);

// import contactRoutes from "./routes/contactRoutes.js";
// app.use("/clients/contacts", contactRoutes);

import orderRoute from "./routes/orderRoutes.js";
app.use("/orders", orderRoute);

import listClientRoute from "./routes/listClientRoutes.js";
app.use("/listClients", listClientRoute);

import statusRoute from "./routes/statusRoutes.js";
app.use("/status", statusRoute);

export default app;
