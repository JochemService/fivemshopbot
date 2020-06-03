const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    

    // !announcement Titel ${splitser} Bericht ${splitser} Kleur ${splitser} Kanaal

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry jij kan dit niet doen");

    // Met dit gaan we tekst splitsen.
    var splitser = "&&&";

    // Nakijken als men wel gegevens meegeeft.
    if (args[0] == null) {

        var useMessage = new discord.RichEmbed()
            .setTitle("Gebruik")
            .setColor("#00ee00")
            .setDescription(`Maak een bericht door gebruik te maken van: \n /bericht Bericht ${splitser} Kleur ${splitser} Kanaal`);

        return message.channel.send(useMessage);

    }

    // Verkrijg al de args en splits ze met de splitser.
    args = args.join(" ").split(splitser);

    // Nakijken als je channel meegeeft of een kleur. Dit plaatsen we hier om een error te voorkomen bij de trim later.
    if (args[1] == undefined) args[2] = "#eeeeee";
    if (args[2] == undefined) args[3] = "💬service-algemeen";

    // Opties die gezet worden als er iets niet wordt meegeven.
    // Voor het kanaal halen we de spaties weg.
    var options = {

        bericht: args[0] || "Geen inhoud opgegeven",
        kleur: args[1].trim(),
        kanaal: args[2].trim()

    }

    // Verkrijgen van wie het bericht aanmaakt.
    var announcer = message.author;

    // Het bericht wat wordt verzonden.
    var announcementMessage = new discord.RichEmbed()

        .setColor(options.kleur)
        .setDescription(`${options.bericht}`)
        .setThumbnail("https://cdn.discordapp.com/attachments/513693851916042243/717768412117336194/fivem.png")
        .setTimestamp();

    // Kanaal krijgen waar het verzonden moet worden.
    var announceChannel = message.guild.channels.find(`name`, options.kanaal);
    if (!announceChannel) return message.channel.send("Kan het kanaal niet vinden");

    // Zenden van het bericht.
    announceChannel.send(announcementMessage);



}

module.exports.help = {
    name: "bericht"
}