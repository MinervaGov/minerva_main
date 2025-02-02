"use client";
import axios from "axios";
import { useAccount } from "wagmi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slice/userSlice";
import { toast } from "sonner";
import { useEthersSigner } from "@/lib/ethersSigner";

export default function useUser() {
  const dispatch = useDispatch();
  const { address, chainId } = useAccount();
  const signer = useEthersSigner();

  const fetchUserProfile = async () => {
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

  return { fetchUserProfile, initializeUser };
}
