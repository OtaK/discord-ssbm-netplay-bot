const Discord = require('discord.js');
const signale = require('signale');
const PlayerQueue = require('./queue');

const client = new Discord.Client();

const queues = {
    fp: new PlayerQueue(),
};

const settings = {
    prefix: '?'
    mmq_command: 'mmq',
    fpq_command: 'fpq',
    mmr_command: 'mmr'
};

client.once('ready', () => {
    signale.success('Discord API Client Ready');
});

client.login('NTgyOTIyMDc3MDcwMTYzOTY4.XO03HQ.mJx8v5eHAowvlBULbhZDtTjlR4U');

client.on('message', async message => {
    if (message.content === `${settings.prefix}${settings.fpq_command}`) {
        const channel = message.channel;
        const deletedMessage = await message.remove();

        queues.fp.pushPlayer(deletedMessage.author);

        signale.time('matchmaking');
        const [p1, p2] = queues.fp.randomPair();
        signale.timeEnd('matchmaking');

        if (p1 && p2) {
            queues.fp.removePlayers(p1, p2);
            const other = p1.username === deletedMessage.author.username ? p1 : p2;
            await deletedMessage.reply(`You have been matched with @${other.username}#${other.tag}`);
        }
    }
});



