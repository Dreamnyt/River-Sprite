const Discord = require("discord.js");
const axios = require("axios");
require("dotenv").config();

module.exports = {
  name: "profile",
  description: "Checks your Teamfights Tactics profile.",
  args: true,

  execute(message, args) {
    let sumRegion = args[0]; // The first word of the string is always the region.

    let tempRegion = args[0];

    let sumName = args.slice(1).join().replace(",", ""); // Everything else is the name and on top of that replace the commas with empty spaces.

    sumName = encodeURI(sumName); // Encodes the sumName incase it has special characters.

    // All the IF statements are to check the right region and set it properly for the link.
    if (sumRegion === "EUNE") {
      sumRegion = "eun1";
    } else if (sumRegion === "EUW") {
      sumRegion = "euw1";
    } else if (sumRegion === "NA") {
      sumRegion = "na1";
    } else if (sumRegion === "KR") {
      sumRegion = "kr";
    }

    axios
      .get(
        "https://" +
          sumRegion +
          ".api.riotgames.com/tft/summoner/v1/summoners/by-name/" +
          `${sumName}`,
        {
          //GET request only using the summonerName.
          headers: {
            "X-Riot-Token": `${process.env.RIOT_TOKEN}`,
          },
        }
      )

      .then((firstGET) => {
        sumId = firstGET.data.id; // Get the summonerID from the first GET request and store it into sumId.

        axios
          .get(
            "https://" +
              sumRegion +
              ".api.riotgames.com/tft/league/v1/entries/by-summoner/" +
              `${sumId}`,
            {
              // Now run the second API request, which has more information.
              headers: {
                "X-Riot-Token": `${process.env.RIOT_TOKEN}`,
              },
            }
          )

          .then((secondGET) => {
            let rank = `${secondGET.data[0].tier}`;

            rank === "IRON" ? (rank = "<:Iron:790249499640856617>") : rank;
            rank === "BRONZE" ? (rank = "<:Bronze:790249455600402484>") : rank;
            rank === "SILVER" ? (rank = "<:Silver:790249551855747072>") : rank;
            rank === "GOLD" ? (rank = "<:Gold:790249551290040340>") : rank;
            rank === "PLATINUM"
              ? (rank = "<:Platinum:790249551855747092>")
              : rank;
            rank === "DIAMOND"
              ? (rank = "<:Diamond:790249551037464646>")
              : rank;
            rank === "MASTER" ? (rank = "<:Master:790249551583379516>") : rank;
            rank === "GRANDMASTER"
              ? (rank = "<:Grandmaster:790249551184396319> ")
              : rank;
            rank === "CHALLENGER"
              ? (rank = "<:Challenger:790249550778335243>")
              : rank;

            let winrate =
              (secondGET.data[0].wins /
                (secondGET.data[0].wins + secondGET.data[0].losses)) *
              100;

            const embed = new Discord.MessageEmbed() // Message format.
              .setAuthor(
                `TFT Profile: ` +
                  `${secondGET.data[0].summonerName}` +
                  ` (${tempRegion})`,
                "https://i.imgur.com/MiwXJV6.png"
              )
              .setThumbnail(
                "https://ddragon.leagueoflegends.com/cdn/10.22.1/img/profileicon/" +
                  `${firstGET.data.profileIconId}` +
                  ".png"
              ) // Take the image ID from the first GET and run it on the database.
              .setDescription("You asked for it, you got it:\n\u200b")
              .setColor("#4287f5")

              .addFields({
                name: "Rank: ",
                value:
                  `${rank}` +
                  `** ${secondGET.data[0].tier.charAt(0).toUpperCase()}` +
                  `${secondGET.data[0].tier.slice(1).toLowerCase()} **` +
                  ` **${secondGET.data[0].rank}\n**` +
                  ` **${secondGET.data[0].leaguePoints} LP** / ${secondGET.data[0].wins}W ${secondGET.data[0].losses}L\n` +
                  `Winrate: ${Math.round(winrate)}%\n\u200b`,
              })

              .setFooter(
                "More info will be added when Riot's API supports more data."
              );

            message.channel.send(embed);
          })

          .catch((secondError) => {
            console.log("Second Error: ", secondError);

            const secondErrorEmbed = new Discord.MessageEmbed()
              .setAuthor(`River Sprite `, "https://i.imgur.com/MiwXJV6.png")
              .setColor("#f54242")

              .addFields({ name: "Error!", value: "❌ No history found." });

            message.channel.send(secondErrorEmbed); // If there is an error - like undefined value - return this error message.
          });
      })

      .catch((firstError) => {
        console.log("First Error: ", firstError);

        const firstErrorEmbed = new Discord.MessageEmbed()
          .setAuthor(`River Sprite `, "https://i.imgur.com/MiwXJV6.png")
          .setColor("#f54242")

          .addFields({ name: "Error!", value: "❌ Wrong region or name." });

        message.channel.send(firstErrorEmbed); // If the region/name is invalid - return error message.
      });
  },
};
