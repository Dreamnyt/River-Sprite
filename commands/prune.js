const Discord = require('discord.js');

module.exports = {
	name: 'prune',
    description: 'Information about the arguments provided.',
    args: true,

	execute(message, args) {
        //message.reply("that feature will become available on 01/01/2021!");
        if (!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("ADMINISTRATOR")) 
            return message.channel.send("You don't have a permissions to do this.");
        if (isNaN(args[0])) 
            return message.channel.send("Please input a valid number.");

        if(args[0] > 100) 
            return message.channel.send("Insert a number less than 100.");
        
        if(args[0] < 2) 
            return message.channel.send("Insert a number more than 1.");

        message.channel.bulkDelete(args[0])

        .then(messages => message.channel.send(`Deleted ${args[0]} messages.`))

        .catch(() => message.channel.send("Something went wrong, while deleting messages."))
	},
};