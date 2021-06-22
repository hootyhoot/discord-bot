import discord from 'discord.js';
import dotenv from 'dotenv';
import { ping } from './commands/ping';
import { help } from './commands/help';
import { bruheg } from './commands/bruheg';
import { boratorium } from './commands/boratorium';

dotenv.config();

const DEBUG_MODE = false;

const client = new discord.Client();

export const commands = [ping, help, bruheg, boratorium];

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
    if (DEBUG_MODE) {
        console.log(`Processing message ${msg.id} from user ${msg.author.id} in channel ${msg.channel.id} of server ${msg.guild.id}.`);
    }

    if (msg.author.id === client.user.id) {
        if (DEBUG_MODE) {
            console.log('Bailing because bot is author of message.');
        }
        return;
    }

    if (msg.content.startsWith('.')) {
        if (DEBUG_MODE) {
            console.log('Message starts with dot.');
        }

        const usedCommand = msg.content.substring(1, msg.content.includes(' ') ? msg.content.indexOf(' ') : msg.content.length);

        if (DEBUG_MODE) {
            console.log(`Command ${usedCommand} identified in message. Running it.`);
        }

        commands.forEach((command) => {
            if (command.name === usedCommand) {
                command.executor(msg);
                if (DEBUG_MODE) {
                    console.log('Command executor done.');
                }
            }
        });
    }
});

client.login(process.env.BOT_SECRET).then();
