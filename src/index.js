/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();
/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
	console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
	if (message.author == client.users.fetch("JamesTheSheep#8509")){
		message.reply("Baaaaa");
	}
	if (message.mentions.users.first() === client.user) {
		const lowerCaseMessage = message.content.toLowerCase();
		if (lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hey')) {
			const authorName = message.member.displayName;
			message.channel.send(`Baaaa, Hi ${authorName}, I am Phil the Dolphin, I am one of Southampton SSAGO's Mascots!`);
		}
		// If the message is "socials"
		else if (message.content.includes(`socials`)) {
			// We can create embeds using the MessageEmbed constructor
			// Read more about all that you can do with the constructor
			// over at https://discord.js.org/#/docs/main/master/class/MessageEmbed
			const embed = new Discord.MessageEmbed()
				// Set the title of the field
				.setTitle(`List of Upcoming Socials`)
				// Set the color of the embed
				.setColor(getSotonColour())
				// Set the main content of the embed
				.setDescription(`-Summer Camp\n-Survival Rally\n-Build-a-Rally`);
			// Send the embed to the same channel as the message
			message.channel.send(embed);
		}
		else if (message.content.includes(`committee`)) {
			// We can create embeds using the MessageEmbed constructor
			// Read more about all that you can do with the constructor
			// over at https://discord.js.org/#/docs/main/master/class/MessageEmbed
			const embed = new Discord.MessageEmbed()
				// Set the title of the field
				.setTitle(`Our Current Committee:`)
				// Set the color of the embed
				.setColor(getSotonColour())
				// Set the main content of the embed
				.setDescription(`-Chair: Megan\n-Secretary: Leah\n-Treasurere: Alex\n-Social Secs: Sophie and Elsie (Elphie)\n-Scout Liasons: Rishi and Georgie\n-Guide Liason: Kirsty\n-Quartermaster: Poppy\n-Webmaster: Leon\n-Archivist: Holly`);
			// Send the embed to the same channel as the message
			message.channel.send(embed);
		}
		else {
			message.channel.send("Baaa, I didn't Quite Catch that");
		}
	}
});
// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(`TOKEN HERE`);
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