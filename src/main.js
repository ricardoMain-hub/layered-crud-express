import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import router from "./routes/userRoute.js";
import pool from "./config/db.js";
import errorHandling from "./middlewares/errorhandler.js";
import createUserTable from "./data/createUserTable.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api", router);

// Error Handling Middleware
app.use(errorHandling);

// Create table before starting server
createUserTable();

// Testing POSTGRES Connection
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  console.log("End");
  res.send(`The database name is:${result.rows[0].current_database}`);
});

// Server Running
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
