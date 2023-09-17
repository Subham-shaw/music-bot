const Discord = require('discord.js')
const moment = require("moment");

module.exports = async(client) => {
    require('../Dashboard/server')(client)
    console.table({
        'Bot User:': `${client.user.tag}`,
        'Guild(s):': `${client.guilds.cache.size} Servers`,
        'Watching:': `${client.guilds.cache.reduce((a, b) => a + b?.memberCount, 0)} Members`,
        'Commands:': `${client.commands.size}`,
        'Discord.js:': `v${Discord.version}`,
        'Node.js:': `${process.version}`,
        'Plattform:': `${process.platform} ${process.arch}`,
        'Memory:': `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`
    })

    // Status
    client.pickPresence = async () => {
        const options = require('../botconfig/status.js')
        const option = Math.floor(Math.random() * options.length)
        nFormatter = client.fnc.nFormatter
        client.user.setPresence({
            activities: [{
                name: options[option].text
                    // .replace("{prefix}", config.prefix)
                    .replace("{guildcount}", nFormatter(client.guilds.cache.size, 2))
                    .replace("{membercount}", nFormatter(client.guilds.cache.reduce((a, b) => a + b?.memberCount, 0), 2))
                    .replace("{created}", moment(client.user.createdTimestamp).format("DD/MM/YYYY"))
                    .replace("{createdime}", moment(client.user.createdTimestamp).format("HH:mm:ss"))
                    .replace("{name}", client.user.username)
                    .replace("{tag}", client.user.tag)
                    .replace("{commands}", client.commands.size),
                type: options[option].type
            }],
            status: options[option].status

        })
    }
    setInterval(client.pickPresence, 10 * 1000)
}