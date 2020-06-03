const discord = require("discord.js");
const fs = require("fs");

const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, arguments) => {
    message.delete(); 

    // !warn @gebruiker tekst

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Je kunt dit niet doen");

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!user) return message.channel.send("Geef een gebruiker op, Of deze gebruiker is niet op deze server");

    if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze persoon kun je niet waarschuwen");

    var reason = arguments.join(" ").slice(22);

    if (!reason) return message.channel.send("Geef een reden op");

    if (!warns[user.id]) warns[user.id] = {
        warns: 0
    };

    warns[user.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err)
    });

    var warnEmbed = new discord.RichEmbed()
        .setDescription("waarschuw")
        .setColor("#00a4db")
        .addField("gewaarschuwde gebruiker", user)
        .addField("gewaarschuwd door", message.author)
        .addField("Aantal waarschuwingen", warns[user.id].warns)
        .addField("Reden", reason);

    var warnChannel = message.guild.channels.find(`name`, "bot-logs");
    if (!warnChannel) return message.guild.send("Kan het kanaal niet vinden");

    warnChannel.send(warnEmbed);

    message.channel.send(`${user} is gewaarschuwd!:white_check_mark: Aantal waarschuwingen: **${warns[user.id].warns}**`);


}

module.exports.help = {
    name: "warn"
}    