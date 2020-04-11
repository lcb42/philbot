/**
 * http://usejsdoc.org/
 */
module.exports = {
    name: 'help',
    aliases: ['commands'],
    description: 'Directs you to the help command',
    execute(message) {
        message.channel.send(`Baaaa, It looks like you were looking for the !help command`);
    },
};