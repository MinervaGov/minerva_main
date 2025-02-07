import express from "express";
const router = express.Router();
import {
  followAgent,
  unfollowAgent,
  getFollowers,
  getFollowedAgents,
} from "../controllers/followController.js";

router.post("/follow", followAgent);
router.post("/unfollow", unfollowAgent);
router.get("/followers/:agentId", getFollowers);
router.get("/followed/:userId", getFollowedAgents);

export default router;
