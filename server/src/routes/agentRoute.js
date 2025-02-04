import express from "express";
const router = express.Router();
import {
  createAgent,
  testTwitterCharacterProfile,
  checkTwitterProfile,
  getAgentByAgentName,
  getAgentsByUserID,
  getAgentByVisibility,
} from "../controllers/agentController.js";

router.get("/check-twitter-profile", checkTwitterProfile);
router.post("/create", createAgent);
router.get("/get/:agentName", getAgentByAgentName);
router.get("/test", testTwitterCharacterProfile);
router.get("/by-user/:userId", getAgentsByUserID);
router.get("/by-visibility/:status", getAgentByVisibility);

export default router;
