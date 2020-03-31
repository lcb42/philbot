/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

const fileSystem = require('fs');
// Import the discord.js module
const Discord = require('discord.js');
//Load the config file
const config = require('./config.json');
// Create an instance of a Discord client
const client = new Discord.Client();
//Read the command files in the commands directory
client.commands = new Discord.Collection();
client.mentions = new Discord.Collection();
const commandFiles = fileSystem.readdirSync(`${__dirname}/commands`).filter(file => file.endsWith('.js'));
const mentionFiles = fileSystem.readdirSync(`${__dirname}/mentions`).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`${__dirname}/commands/${file}`);
	client.commands.set(command.name, command);
}
for (const file of mentionFiles) {
	const mention = require(`${__dirname}/mentions/${file}`);
	client.mentions.set(mention.name, mention);
}
/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
	console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
	//if (message.author == client.users.fetch("JamesTheSheep#8509")){
	//	message.reply("Baaaaa");
	//}
	
	if (message.mentions.users.first() === client.user) {
		const lowerCaseMessage = message.content.toLowerCase();
		responsesUsed = client.mentions.filter(mention => {
			if (lowerCaseMessage.includes(mention.name)) return true;
			if (mention.aliases == null) return false;
			for (const alias of mention.aliases){
				if (lowerCaseMessage.includes(alias)) return true;
			}
			return false;
		});
		if (responsesUsed.size > 0){
			try {
				return responsesUsed.first().execute(message);
			} catch (error) {
				console.error(error);
			}
		}
		

		const args = message.content.split(/ +/);
		if (!args[1].startsWith(config.prefix)) return message.channel.send("Baaa, I didn't Quite Catch that");
		const commandName = args[1].slice(config.prefix.length).toLowerCase();
		const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		if (!client.commands.has(commandName)) return message.reply('Baaa, I couldn\'t find that command!');
		try {
			return command.execute(message, args);
		} catch (error) {
			console.error(error);
			return message.reply('Baaa, I didn\'t Quite Catch that command!');
		}
	}
});
// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(config.token);
var currentSotonColour = false;
function getSotonColour(){
	if (currentSotonColour){
		currentSotonColour = false;
		return 0xfecb00;
	}
	else{
		currentSotonColour = true;
		return 0x990000;
	}
}