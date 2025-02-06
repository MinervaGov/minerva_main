import express from "express";
const router = express.Router();
import {
  getVp,
  getDelegates,
  getDelegatePayload,
} from "../controllers/daoController.js";

router.get("/vp/:daoId/:walletAddress", getVp);
router.get("/delegates/:daoId/:walletAddress", getDelegates);
router.get("/delegateData/:daoId/:targetAddress", getDelegatePayload);

export default router;
