import { Bot } from "grammy";
import { addSubscriptionTg } from "./convex.js";

const bot = new Bot(process.env.TG_BOT_TOKEN)

// Commands
bot.command("start", (ctx) => {
    ctx.reply(`Hello, I am Minerva. Please communicate with me, with the help of the commands ❤️`);
});

bot.command("ping", (ctx) => {
    ctx.reply("Pong!");
});

// Subscription
bot.command("subscribe", async (ctx) => {
    let agentName = ctx.match;
    let author = await ctx.getAuthor();

    const authorId = author.user.id

    try {
        await addSubscriptionTg(agentName, authorId)
        bot.api.sendMessage(authorId, `You are now subscribed to agent *${agentName}* ✅`, {parse_mode: "Markdown"})
    }
    catch (error) {
        ctx.reply(`Error: ${error}`)
    }
});

// Generic Texts
bot.on("message", (ctx) => {
    ctx.reply("Sadly, I cannot reply to texts, please use available commands 😔");
});

export default bot;