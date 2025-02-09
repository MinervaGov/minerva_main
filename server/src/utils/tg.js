import { Bot } from "grammy";
import { addSubscriptionTg, getAgentById } from "./convex.js";

const bot = new Bot(process.env.TG_BOT_TOKEN);

// Commands
bot.command("start", (ctx) => {
  ctx.reply(
    `Hello👋, I am Minerva. Please communicate with me with the help of the commands ❤️`
  );
});

// Subscription
bot.command("subscribe", async (ctx) => {
  if (ctx.match == "") {
    return ctx.reply(`Please mention agent name 🤖`);
  }

  let agentName = ctx.match;
  let author = await ctx.getAuthor();

  const authorId = author.user.id.toString();

  try {
    await addSubscriptionTg(agentName, authorId);
    bot.api.sendMessage(
      authorId,
      `You are now subscribed to agent *${agentName}* ✅`,
      { parse_mode: "Markdown" }
    );
  } catch (error) {
    ctx.reply(`Error: ${error}`);
  }
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function notifyNewProposalTG(
  users,
  snapshotSpaceId,
  proposalId,
  aiSummary
) {
  if (!users) {
    return;
  }

  const proposalLink = `https://snapshot.box/#/s:${snapshotSpaceId}/proposal/${proposalId}`;

  let counter = 0;
  for (let agent of users) {
    const agentDetails = await getAgentById(agent.agentId);
    let agentName = agentDetails.name;
    for (let user of agent.usersTg) {
      counter++;
      if (counter == 30) {
        await delay(1000);
        counter = 0;
      }

      // Escape required sequences
      agentName = agentName.replace(/([_*`\[])/g, '\\$1');
      aiSummary = aiSummary.replace(/([_*`\[])/g, '\\$1');

      bot.api.sendMessage(
        user,
        `📢*NEW PROPOSAL ALERT*📢\n\nAgent: *${agentName}*\n\n${aiSummary}\n\nRead more: [Snapshot](${proposalLink})`,
        { parse_mode: "Markdown" }
      );
    }
  }

  return;
}

async function notifyDecisionTG(users, title, choices, aiResponse) {
  if (!users) {
    return;
  }

  let counter = 0;
  for (let agent of users) {
    const agentDetails = await getAgentById(agent.agentId);
    let agentName = agentDetails.name;
    for (let user of agent.usersTg) {
      counter++;
      if (counter == 30) {
        await delay(1000);
        counter = 0;
      }

      agentName = agentName.replace(/([_*`\[])/g, '\\$1');
      const reason = aiResponse.reason.replace(/([_*`\[])/g, '\\$1');

      bot.api.sendMessage(
        user, 
        `✅*AGENT ${agentName} VOTED*✅\n\nTitle: ${title}\n\nVote: ${choices[parseInt(aiResponse.vote) - 1]}\n\nReason: ${reason}`,
        { parse_mode: "Markdown" }
    );
    }
  }

  return;
}

// Generic Texts
bot.on("message", (ctx) => {
  ctx.reply("Sadly, I cannot reply to texts, please use available commands 😔");
});

export { bot, notifyNewProposalTG, notifyDecisionTG };
