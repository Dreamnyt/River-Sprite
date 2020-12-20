const Discord = require('discord.js');

module.exports = {
	name: 'avatar',
    description: 'Information about the arguments provided.',
    args: false,

	execute(message, args) {

        if(!message.mentions.users.first()) {
            const avatarEmbed = new Discord.MessageEmbed()
                .setAuthor(`River Sprite `, 'https://i.imgur.com/MiwXJV6.png')
                .setImage(message.author.displayAvatarURL({size: 2048, dynamic: true}))
                .setColor("#4287f5")

            return message.channel.send(avatarEmbed);
        } else {
            const user = message.mentions.users.first();

            const avatarEmbed = new Discord.MessageEmbed()
                .setAuthor(`River Sprite `, 'https://i.imgur.com/MiwXJV6.png')
                .setImage(user.displayAvatarURL({size: 2048, dynamic: true}))
                .setColor("#4287f5")

            return message.channel.send(avatarEmbed);
        }
	},
};