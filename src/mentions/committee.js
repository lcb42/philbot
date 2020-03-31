module.exports = {
    name: 'committee',
    description: 'Gives a list of the current Southampton SSAGO committee',
    execute(message) {
            const Discord = require('discord.js');
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