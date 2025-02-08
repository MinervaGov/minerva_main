import { Client, Events, GatewayIntentBits, ApplicationCommandOptionType, Activity, ActivityType, Collection, InteractionType, EmbedBuilder } from "discord.js";
import { addSubscriptionDiscord, getAgentById } from "./convex.js";

const DiscClient = new Client({ intents: [GatewayIntentBits.Guilds] });
DiscClient.commands = new Collection();

//Commands
let subCommand = {
    name: 'subscribe',
    description: ('Subscribe to notifications from an agent'),
    options: [
        {
            name: 'agent',
            description: ('The agent you want to subscribe to'),
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ int }) {
        const agentName = int.options.getString('agent');
        const authorId = int.user.id;

        try {
            await addSubscriptionDiscord(agentName, authorId);
            int.reply({ content: `You are now subscribed to agent **${agentName}** ✅`, ephemeral: false });
        }
        catch (error) {
            int.reply({ content: `Error: ${error}`, ephemeral: true });
        }
    },
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function notifyProposalDiscord(users, snapshotSpaceId, proposalId, aiSummary) {
    if (!users) {
        return;
    }

    const proposalLink = `https://snapshot.box/#/s:${snapshotSpaceId}/proposal/${proposalId}`;

    let counter = 0;
    for (let agent of users) {
        const agentDetails = await getAgentById(agent.agentId);
        const agentName = agentDetails.name;
        for (let user of agent.usersDisc) {
            counter++;
            if (counter == 30) {
                await delay(1000);
                counter = 0;
            }
            (await DiscClient.users.fetch(user)).send(`📢**NEW PROPOSAL ALERT**📢\n\nAgent: **${agentName}**\n\n${aiSummary}\n\nRead more: [Snapshot](${proposalLink})`);
        }
    }

    return;
}

async function notifyDecisionDiscord(users, title, choices, aiResponse) {
    if (!users) {
        return;
    }

    let counter = 0;
    for (let agent of users) {
        const agentDetails = await getAgentById(agent.agentId);
        const agentName = agentDetails.name;
        for (let user of agent.usersDisc) {
            counter++;
            if (counter == 30) {
                await delay(1000);
                counter = 0;
            }
            (await DiscClient.users.fetch(user)).send(`✅*AGENT ${agentName} VOTED*✅\n\nTitle: ${title}\n\nVote: ${choices[parseInt(aiResponse.vote) - 1]}\n\nReason: ${aiResponse.reason}`);
        }
    }

    return;
}

// Register command
DiscClient.commands.set(subCommand.name.toLowerCase(), subCommand);

// Events
DiscClient.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    DiscClient.user.setPresence({
        activities: [{ name: 'for new proposals', type: ActivityType.Watching }]
    });
    DiscClient.user.setStatus('online');
});

DiscClient.on("ready", (client) => {
    client.application.commands.set([subCommand]);
});

DiscClient.on("interactionCreate", (int) => {
    if (int.type === InteractionType.ApplicationCommand) {
        const command = DiscClient.commands.get(int.commandName);

        if (!command) {
            errorEmbed.setDescription(`❌ | Some error occured !`);
            int.reply({ embeds: [errorEmbed], ephemeral: true });
            return DiscClient.slash.delete(int.commandName);
        }

        command.execute({ int });
    }
});

export { DiscClient, notifyProposalDiscord, notifyDecisionDiscord };