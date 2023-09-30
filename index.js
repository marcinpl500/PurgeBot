const { channel } = require("diagnostics_channel");
const {Client, Intents} = require("discord.js");
const {token, GuildId} = require("./config.json");

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]})

client.once('ready', () => {
    console.log("Ready")
    const Guilds = client.guilds.cache.map(guild => guild.id);
    var Guild;
    if(Guilds.indexOf(GuildId))
    {
        console.log("FoundGuild")
        Guild = client.guilds.cache.get(GuildId);
        if(Guild.available)
        {
            console.log(Guild.name);
            console.log("Guild available")
            var Channels = Guild.channels.cache.filter(ch => ch.deleted == false && ch.type == "GUILD_TEXT");
            console.log(Channels.values);
            var iterations = 0;
            for (const [key,chn] of Channels)
            {
                console.log(iterations);
                iterations++;
                let fetched;
              do{
                fetched = await chn.messages.fetch({limit: 98})
                .then(messages => console.log("Messages fetched"))
                .catch(console.error);
                chn.bulkDelete(fetched);
              }
              while(fetched.size >=1)
            }
        }
        else
        {
            console.log("Guild unavailable");
        }
    }
    else
    {
        console.log("Guild not found")
    }
    console.log(Guilds);
});

client.login(token)