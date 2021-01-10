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
      while (tmp > 1) {
        if (tmp === 2) {
          break;
        }

        if (tmp < 100) {
          message.channel.bulkDelete(tmp);
          let remainder = tmp;
          tmp += 2;
          tmp -= remainder;
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
