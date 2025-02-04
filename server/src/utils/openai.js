import { OpenAI } from "openai";

const openai = new OpenAI({
  organization: "org-Do6wpVcergWrvbWIky6KtC5L",
  project: "proj_sMUWmbugP0mLEJZigU7FP4ei",
});

const createTwitterCharacterProfile = async (twitterPosts) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You analyze Twitter posts and generate a JSON character profile based on personality inference.
        Output **strictly in JSON format** with the following structure:
        {
          "username": "Twitter handle",
          "sentiment": "Positive | Negative | Neutral",
          "emotional_tone": "Joy | Sadness | Anger | Sarcasm | Humor | Fear | Neutral",
          "personality_traits": {
            "openness": "Low | Medium | High",
            "conscientiousness": "Low | Medium | High",
            "extraversion": "Low | Medium | High",
            "agreeableness": "Low | Medium | High",
            "neuroticism": "Low | Medium | High"
          },
          "communication_style": {
            "formality": "Formal | Casual | Slang-heavy | Meme-based",
            "emoji_usage": "Frequent | Occasional | Rare",
            "sarcasm": "Boolean (true/false)"
          },
          "interest_categories": [
            "Tech", "Politics", "Gaming", "Crypto", "Science", "Sports", "Arts", "Entertainment",
            "Health", "Finance", "Fashion", "Music", "Food", "Travel", "AI", "Memes"
          ],
          "engagement_level": "High | Medium | Low"
        }
        Extract meaningful traits from the given Twitter posts and do not add any extra text.`,
      },
      {
        role: "user",
        content: `Analyze these tweets: ${JSON.stringify(twitterPosts)}`,
      },
    ],
  });

  const profile = JSON.parse(completion.choices[0].message.content);
  return profile;
};

const summarizeProposal = async (proposal) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You summarize a proposal.`,
      },
      {
        role: "user",
        content: `Summarize the following proposal: ${proposal}`,
      },
    ],
  });

  return completion.choices[0].message.content;
};

export { createTwitterCharacterProfile, summarizeProposal };
