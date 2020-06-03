const discord = require("discord.js");

module.exports.run = async (bot, message, arguments) => {



    // !kick @Tycho De Gamer redenen hier.
    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));

    if (!kickUser) return message.channel.send("Gebruiker is niet gevonden");

    var reason = arguments.join(" ").slice(22);

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Sorry jij kan dit niet doen");

    if (kickUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Deze gebruiker kan je niet kicken");

    message.channel.send(`${kickUser} is gekickt Voor de reden: **${reason}**`);


    var kick = new discord.RichEmbed()
        .setDescription("Kick")
        .setColor("#00a4db")
        .addField("Kicked gebruiker", kickUser)
        .addField("Gekickt door", message.author)
        .addField("Reden", reason);

    var kickChannel = message.guild.channels.find(`name`, "bot-logs");
    if (!kickChannel) return message.guild.send("Kan het kanaal niet vinden");

    message.guild.member(kickUser).kick(reason);

    kickChannel.send(kick);

    return;

}

module.exports.help = {
    name: "kick"
}