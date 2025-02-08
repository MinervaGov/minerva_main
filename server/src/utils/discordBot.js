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

    async execute({ int, client }) {
        const agentName = int.options.getString('agent');
        const authorId = int.user.id;

        try {
            await addSubscriptionDiscord(agentName, authorId);
            client.users.fetch(authorId).send(`You are now subscribed to agent *${agentName}* ✅`)
                .catch(console.error);
        }
        catch (error) {
            int.reply({ content: `Error: ${error}`, ephemeral: true });
        }
    },
};

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

        command.execute({ int, DiscClient });
    }
});

export default DiscClient;