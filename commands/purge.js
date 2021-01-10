const Discord = require("discord.js");

module.exports = {
  name: "purge",
  description: "Bulk removes specific amount of messages.",
  args: true,

  execute(message, args) {
    let amountMessages = args[0];
    amountMessages = parseInt(amountMessages);

    if (amountMessages > 100) {
      let tmp = amountMessages;
      while (tmp != 2) {
        if (tmp < 100) {
          message.channel.bulkDelete(tmp);
          tmp -= tmp;
          tmp += 2;
          console.log(tmp);
        } else {
          message.channel.bulkDelete(100);
          tmp -= 100;
        }
      }

      message.channel.send(`Deleted ${amountMessages} messages.`);
    } else if (amountMessages <= 100) {
      message.channel
        .bulkDelete(amountMessages)

        .then((messages) =>
          message.channel.send(`Deleted ${amountMessages} messages.`)
        )

        .catch(() =>
          message.channel.send("Something went wrong, while deleting messages.")
        );
    } else if (amountMessages < 2) {
      return message.channel.send("Insert a number more than 1.");
    }
  },
};
