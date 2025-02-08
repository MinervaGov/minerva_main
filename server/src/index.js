import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoute.js";
import agentRoutes from "./routes/agentRoute.js";
import proposalRoutes from "./routes/proposalRoute.js";
import daoRoutes from "./routes/daoRoute.js";
import followRoutes from "./routes/followRoute.js";
import redis from "./utils/redis.js";
import {
  listenForProposals,
  loadDaoProposals,
  loadPendingDecisions,
  loadQueuedDecisions,
} from "./utils/snapshot.js";
import { bot } from "./utils/tg.js";
import DiscClient from "./utils/discordBot.js";
import { decisionQueue, scheduleQueue } from "./utils/Queue.js";
import { getUsersToNotify } from "./utils/convex.js";

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
  loadQueuedDecisions();
  loadPendingDecisions();
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

app.get("/api/add-queue/:decisionId", async (req, res) => {
  const { decisionId } = req.params;
  await decisionQueue.add({ decisionId });
  res.status(200).json({ message: "Decision added to queue" });
});

app.get("/api/add-schedule/:decisionId", async (req, res) => {
  const { decisionId } = req.params;
  await scheduleQueue.add({ decisionId });
  res.status(200).json({ message: "Decision added to schedule" });
});

app.get("/api/get-users-to-notify/:daoId", async (req, res) => {
  const { daoId } = req.params;
  const users = await getUsersToNotify(daoId);
  res.status(200).json(users);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Start telegram bot
bot.start();

// Start discord bot
const DiscToken = process.env.DISCORD_TOKEN;
DiscClient.login(DiscToken);