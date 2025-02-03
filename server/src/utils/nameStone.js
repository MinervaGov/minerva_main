import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const setNamestoneDomain = async (domain, address) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: process.env.NAMESTONE_API_KEY,
  };

  const body = {
    domain: "minervagov.eth",
    name: domain,
    address: address,
    text_records: {
      url: "https://minerva.vote",
      "com.twitter": "mnvgov",
      avatar:
        "https://hip-wildebeest-282.convex.cloud/api/storage/5e9214df-7fb9-4952-a9c3-c24ac2223f8b",
    },
  };

  const response = await axios.post(
    "https://namestone.com/api/public_v1/set-name",
    body,
    { headers }
  );

  return response.data;
};

export { setNamestoneDomain };
