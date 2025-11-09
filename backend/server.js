
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";

dotenv.config();
connectDB();
const app = express();

app.use(cors()); 
app.use(express.json()); 

app.use("/api/auth", authRoutes);     
app.use("/api/students", studentRoutes); 
app.use("/api/results", resultRoutes);   

app.get("/", (req, res) => {
  res.send(" Mini LMS Backend is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
