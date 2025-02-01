import express from "express";
const router = express.Router();
import {
  createAgent,
  testTwitterCharacterProfile,
} from "../controllers/agentController.js";

router.post("/create", createAgent);
router.get("/test", testTwitterCharacterProfile);

export default router;
