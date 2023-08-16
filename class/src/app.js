
import express from "express";
const app = express();

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

export default app;
