import express from "express";
const router = express.Router();
import {
  createAgent,
  testTwitterCharacterProfile,
  checkTwitterProfile,
  getAgentByAgentName,
  getAgentsByUserID,
  getAgentByVisibility,
  getDecisions,
} from "../controllers/agentController.js";

router.get("/check-twitter-profile", checkTwitterProfile);
router.post("/create", createAgent);
router.get("/get/:agentName", getAgentByAgentName);
router.get("/test", testTwitterCharacterProfile);
router.get("/by-user/:userId", getAgentsByUserID);
router.get("/by-visibility/:status", getAgentByVisibility);
router.get("/decisions/:agentId", getDecisions);

export default router;
