import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoute.js";
import agentRoutes from "./routes/agentRoute.js";
import proposalRoutes from "./routes/proposalRoute.js";
import daoRoutes from "./routes/daoRoute.js";
import followRoutes from "./routes/followRoute.js";
import redis from "./utils/redis.js";
import { listenForProposals, loadDaoProposals } from "./utils/snapshot.js";
import decisionQueue from "./utils/Queue.js";
import bot from "./utils/tg.js"

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
app.use("/api/proposals", proposalRoutes);
app.use("/api/dao", daoRoutes);
app.use("/api/follow", followRoutes);

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

app.get("/api/add-queue/:decisionId", async (req, res) => {
  const { decisionId } = req.params;
  await decisionQueue.add({ decisionId });
  res.status(200).json({ message: "Decision added to queue" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Start telegram bot
bot.start();