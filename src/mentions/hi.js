module.exports = {
    name: 'hi',
    aliases: ['hey', 'hello'],
    description: 'Gives a description of this mascot',
    execute(message) {
        const authorName = message.member.displayName;
        message.channel.send(`Baaaa, Hi ${authorName}, I am Phil the Dolphin, I am one of Southampton SSAGO's Mascots!`);
    },
};