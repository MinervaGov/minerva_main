"use client";
import axios from "axios";
import { useAccount } from "wagmi";
import { useDispatch } from "react-redux";
import {
  setFollowedAgents,
  setIsLoading,
  setUser,
} from "@/redux/slice/userSlice";
import { toast } from "sonner";
import { useEthersSigner } from "@/lib/ethersSigner";
import { useSelector } from "react-redux";

export default function useUser() {
  const dispatch = useDispatch();
  const { address, chainId } = useAccount();
  const signer = useEthersSigner();
  const user = useSelector((state) => state.user.user);

  const fetchUserProfile = async () => {
    dispatch(setIsLoading(true));
    dispatch(setUser(null));
    dispatch(setFollowedAgents([]));
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${address}`
      );

      if (response.data.success) {
        dispatch(setUser(response.data.user));
      } else {
        dispatch(setUser(null));
      }
    } catch (error) {
      dispatch(setUser(null));
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const initializeUser = async (username) => {
    try {
      const domain = {
        name: "minervagov.eth",
        version: "1",
        chainId: chainId,
        verifyingContract: process.env.NEXT_PUBLIC_MINERVA_GOV_ADDRESS,
      };

      const types = {
        NewUser: [
          { name: "walletAddress", type: "address" },
          { name: "name", type: "string" },
        ],
      };

      const message = {
        walletAddress: address,
        name: username,
      };

      const signature = await signer._signTypedData(domain, types, message);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        {
          walletAddress: address,
          name: username,
          signature: signature,
          chainId: chainId,
        }
      );

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success("User initialized successfully");
      } else {
        dispatch(setUser(null));
      }
    } catch (error) {
      toast.error("Error initializing user");
      console.log(error);
      dispatch(setUser(null));
    }
  };

  const getFollowedAgents = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/follow/followed/${user._id}`
      );

      if (response.data.success) {
        dispatch(setFollowedAgents(response.data.followedAgents));
      } else {
        dispatch(setFollowedAgents([]));
      }
    } catch (error) {
      console.log(error);
      dispatch(setFollowedAgents([]));
    }
  };

  return { fetchUserProfile, initializeUser, getFollowedAgents };
}
