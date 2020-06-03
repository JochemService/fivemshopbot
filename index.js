const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const active = new Map();

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);
    
    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("kon geen files vinden");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen :}`)

        bot.commands.set(fileGet.help.name, fileGet);

    })

});



bot.on("guildMemberAdd", member => {

var role = member.guild.roles.find("name", "niks");

if (!role) return;

const channel = member.guild.channels.find("name", "👋welkom");

const regels = member.guild.channels.find("name", "🚫regels");

if (!channel) return;

channel.send(`>hey ${member} welkom.
>Dit is een Nederlandse FiveM shop hier kan verschilnde dingen kopen!
>Lees nu A.U.B. ${regels}!`);
});


bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`)

   // bot.user.setActivity("uw vragen!", {type: "LISTENING"});

    let statuses = [
        "Fivem shop",
        "Hulp nodig? maak ticket aan!",
        "FiveM server: SweetlakeRP",
        "Welkom",
        `${bot.users.size} members ;)`
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "WATCHING"});

    }, 3000)
});
bot.on('message', message => {
    const ticket = member.guild.channels.find("name", "📩ticket-aanmaken");
    if(message.content.toLowerCase() === 'Hoe maak ik een ticket aan?');
        message.channel.send(`hay ${member}, dat kan via de channal ${ticket}!`);
});
        
bot.on('message', message => {
    const ticket = member.guild.channels.find("name", "📩ticket-aanmaken");
    if(message.content.toLowerCase() === 'Hoe maak ik een ticket aan')
        message.channel.send(`hay ${member}, dat kan via de channal ${ticket}!`);
});
        
bot.on('message', message => {
    const ticket = member.guild.channels.find("name", "📩ticket-aanmaken");
    if(message.content.toLowerCase() === 'waar maak ik een ticket aan')
        message.channel.send(`hay ${member}, dat kan via de channal ${ticket}!`);
});
        
bot.on('message', message => {
    const ticket = member.guild.channels.find("name", "📩ticket-aanmaken");
    if(message.content.toLowerCase() === 'waar maak ik een ticket aan?')
        message.channel.send(`hay ${member}, dat kan via de channal ${ticket}!`);
});
        
bot.on('message', message => {
    const ticket = member.guild.channels.find("name", "📩ticket-aanmaken");
    if(message.content.toLowerCase() === 'Hoe maak ik een ticket aan?')
        message.channel.send(`hay ${member}, dat kan via de channal ${ticket}!`);
});
        
bot.on('message', message => {
    const ticket = member.guild.channels.find("name", "📩ticket-aanmaken");
    if(message.content.toLowerCase() === 'hoe ticket aanmaken?')
        message.channel.send(`hay ${member}, dat kan via de channal ${ticket}!`);
});
        

// chat bot

bot.on("message", async message => {

    // Als bot bericht stuurt stuur dan return
    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;
    
    var messageArray = message.content.split(" ");

	var command = messageArray[0].toLowerCase();

    var arguments = messageArray.slice(1);


if (!commands) {

    var swearWords = JSON.parse(fs.readFileSync("./data/swearWords.json"));
    
    var sentenceUser = "";
    
    var amountSwearWords = 0;

    for (var y = 0; y < messageArray.length; y++) {

        var changeWord = "";

        for (var i = 0; i < swearWords["vloekWoorden"].length; i++) {

            var word = messageArray[y].toLowerCase();

            if (word == swearWords["vloekWoorden"][i]) {

                changeWord = word.replace(swearWords["vloekWoorden"][i], "(piep)");

                sentenceUser = sentenceUser + " " + changeWord;

                amountSwearWords++;

            }

        }

        if (!changeWord) {

            sentenceUser = sentenceUser + " " + messageArray[y];

        }

    }

    if (amountSwearWords != 0) {

        message.delete();
        message.channel.send(sentenceUser);
        message.channel.send(message.author + " Niet vloeken A.U.B");

    }

}

    var commands = bot.commands.get(command.slice(prefix.length));

    if (!message.content.startsWith(prefix)) return;
    
    var options = {
        
        active: active
        
    }

    if (commands) commands.run(bot, message, arguments, options)
    
    
// Nakijken als het geen command is.

});
bot.login(process.env.token);