import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoute.js";
import agentRoutes from "./routes/agentRoute.js";
import redis from "./utils/redis.js";
import { listenForProposals, loadDaoProposals } from "./utils/snapshot.js";

// Load environment variables
dotenv.config();

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/agents", agentRoutes);

app.get("/", (req, res) => {
  res.send("Minerva Backend is running 🚀");
});

// Redis connection
redis.on("connect", async () => {
  console.log("Successfully connected to Redis");

  await loadDaoProposals();
  listenForProposals();
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
