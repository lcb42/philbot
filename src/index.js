/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */
String.prototype.capitalize = function() {
	  return this.charAt(0).toUpperCase() + this.slice(1)
}
const fileSystem = require('fs');
// Import the discord.js module
const Discord = require('discord.js');
// Load the config file
const config = require('./config.json');
// Create an instance of a Discord client
const client = new Discord.Client();
// Read the command files in the commands directory
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
// Cooldowns
const cooldowns = new Discord.Collection();
/**
 * The ready event is vital, it means that only _after_ this will your bot start
 * reacting to information received from Discord
 */
client.on('ready', () => {
	console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
	if (message.guild && config.included_guidlds && !config.included_guidlds.find(guildid => message.guild.id == guildid)) return;
	if (message.guild && config.excluded_guidlds && config.excluded_guidlds.find(guildid => message.guild.id == guildid)) return;
	// if (message.author == client.users.fetch("JamesTheSheep#8509")){
	// message.reply("Baaaaa");
	// }
	
	if (message.mentions.users.first() === client.user || (!message.guild && message.author != client.user)) {
		const args = message.content.split(/ +/);
		// Get rid of mention
		if (message.mentions.users.first() === client.user) args.shift();
		if (!args[0].startsWith(config.prefix)) {
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
		}
		

		if (!args[0].startsWith(config.prefix)) return message.channel.send("Baaa, I didn't Quite Catch that");// Is a command?
		const commandName = args[0].slice(config.prefix.length).toLowerCase();
		args.shift();// Get rid of name
		const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		if (!command) return message.reply('Baaa, I couldn\'t find that command!');
		if (!cooldown(command, message.author)) return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		if (command.args && command.args != args.length) {
			let reply = `You didn't provide enough arguments, ${message.author}!`;
			if (command.usage) {
				reply += `\nThe proper usage would be: ${config.prefix}${command.name} ${command.usage}`;	
			}
			return message.channel.send(reply);
		}
		try {
			return command.execute(message, args);
		} catch (error) {
			console.error(error);
			return message.reply('Baaa, I didn\'t Quite Catch that command!');
		}
	}
});
// Log our bot in using the token from
// https://discordapp.com/developers/applications/me
client.login(config.token);
var currentSotonColour = false;
module.exports.getSotonColour = function(){
	if (currentSotonColour){
		currentSotonColour = false;
		return 0xfecb00;
	}
	else{
		currentSotonColour = true;
		return 0x990000;
	}
}
function cooldown(command, user){
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 1) * 1000;

	if (timestamps.has(user.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return false;
		}
	}
	timestamps.set(user.id, now);
	setTimeout(() => timestamps.delete(user.id), cooldownAmount);
	return true;
}
