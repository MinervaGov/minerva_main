import ethers from "ethers";
import { addUser, getUserByAddress } from "../utils/convex.js";
import dotenv from "dotenv";
dotenv.config();
import ung from "unique-names-generator";

const createUser = async (req, res) => {
  try {
    const { walletAddress, chainId, signature } = req.body;

    let name = "";

    if (!walletAddress || !chainId || !signature) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const domain = {
      name: "minervagov.eth",
      version: "1",
      chainId: chainId,
      verifyingContract: process.env.MINERVA_GOV_ADDRESS,
    };

    const types = {
      NewUser: [
        { name: "walletAddress", type: "address" },
        { name: "name", type: "string" },
      ],
    };

    const message = {
      walletAddress,
      name,
    };

    const recoveredAddress = ethers.utils.verifyTypedData(
      domain,
      types,
      message,
      signature
    );

    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return res.json({
        success: false,
        message: "Invalid signature",
      });
    }

    if (!name) {
      const customConfig = {
        dictionaries: [ung.adjectives, ung.animals],
        separator: "-",
        length: 2,
      };

      name = ung.uniqueNamesGenerator(customConfig);
    }

    const user = await addUser(walletAddress, name);

    return res.json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { walletAddress } = req.params;

    if (!walletAddress) {
      return res.json({
        success: false,
        message: "Wallet address is required",
      });
    }
    const user = await getUserByAddress(walletAddress);

    return res.json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error getting user",
    });
  }
};

export { createUser, getUser };
