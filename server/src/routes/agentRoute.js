import express from "express";
const router = express.Router();
import {
  createAgent,
  testTwitterCharacterProfile,
  checkTwitterProfile,
  getAgentByAgentName,
} from "../controllers/agentController.js";

router.get("/check-twitter-profile", checkTwitterProfile);
router.post("/create", createAgent);
router.get("/get/:agentName", getAgentByAgentName);
router.get("/test", testTwitterCharacterProfile);

export default router;
