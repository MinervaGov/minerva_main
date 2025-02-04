import Queue from "bull";
import { changeDecisionStatus } from "./convex.js";

const decisionQueue = new Queue("decisions", {
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
  },
});

decisionQueue.process(async (job) => {
  try {
    const { decisionId } = job.data;
    await processDecisions(decisionId);
  } catch (error) {
    console.error("Error processing decision:", error);
  }
});

const processDecisions = async (decisionId) => {
  await changeDecisionStatus(decisionId, "pending");
  // TODO: Add logic to process the decision
  return new Promise((resolve) => setTimeout(resolve, 5000));
};

export default decisionQueue;
