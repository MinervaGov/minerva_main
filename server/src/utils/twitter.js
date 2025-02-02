import { Scraper } from "agent-twitter-client";
import dotenv from "dotenv";

dotenv.config();

const getTwitterPosts = async (twitterId, maxTweets = 10) => {
  const scraper = new Scraper();

  await scraper.login(
    process.env.TWITTER_USERNAME,
    process.env.TWITTER_PASSWORD,
    process.env.TWITTER_EMAIL,
    process.env.TWITTER_API_KEY,
    process.env.TWITTER_API_SECRET_KEY,
    process.env.TWITTER_ACCESS_TOKEN,
    process.env.TWITTER_ACCESS_TOKEN_SECRET
  );

  const tweetsGenerator = scraper.getTweets(twitterId, maxTweets);
  const tweets = [];

  // Method 1: Using for-await-of
  for await (const tweet of tweetsGenerator) {
    tweets.push(tweet);
  }

  return tweets;
};

const checkProfile = async (twitterId) => {
  const scraper = new Scraper();
  const profile = await scraper.getProfile(twitterId);
  return profile;
};

export { getTwitterPosts, checkProfile };
