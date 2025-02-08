import express from "express";
const router = express.Router();
import { reEvaluate, disputeDecision } from "../controllers/utilsController.js";

router.post("/re-evaluate", reEvaluate);
router.post("/dispute", disputeDecision);

export default router;
