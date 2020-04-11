module.exports = {
    name: 'socials',
    description: 'List of upcoming Southampton SSAGO socials',
    execute(message) {
            const Discord = require('discord.js');
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
    },
};
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