import { getProposalById } from "../utils/convex.js";

const getProposal = async (req, res) => {
  try {
    const { id } = req.params;

    const proposal = await getProposalById(id);

    return res.json({
      success: true,
      proposal,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error getting proposal",
    });
  }
};

export { getProposal };
