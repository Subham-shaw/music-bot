const { Client, GatewayIntentBits, Collection } = require('discord.js')
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates, 
        GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildInvites, GatewayIntentBits.DirectMessages, 
        GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.MessageContent, 
        GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences,
    ]
})

//Settings
client.con = require(`./botconfig/config.json`)
client.em = require(`./botconfig/emoji.json`)
client.ee = require(`./botconfig/embed.json`)
client.fnc = require('./Handlers/functions')
client.commands = new Collection()
client.deploySlash = {
    enabled: true,
    guild: false
}

function requiredHandlers() {
    ['main', 'database', 'music'].forEach(file => {
        try {
            require(`./Handlers/${file}`)(client)
        } catch (e) {
            console.log(e)
        }
    });
} requiredHandlers()

client.login(client.con.token)