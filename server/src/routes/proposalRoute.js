import express from "express";
const router = express.Router();
import { getProposal } from "../controllers/proposalController.js";

router.get("/get/:id", getProposal);

export default router;
