const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "uptime",
    description: "Show the Bot's uptime",
    category: "BotInfo",

    run: async (client, interaction) => {
        await interaction.deferReply()
        let date = new Date()
        let timestamp = date.getTime() - Math.floor(client.uptime);
        
        const uptimeEmbed = new EmbedBuilder()
            .setColor(client.ee.color)
            .setTitle(`<a:online:1094117871141003355> Uptime`)
            .setFields(
                { name: `<:Start:1105383427362005033> Started at:`, value: `> <t:${Math.floor(timestamp / 1000)}:F>`, inline: true },
                { name: `<a:working:1105383041481850961> Running Since: `, value: `> <t:${Math.floor(timestamp / 1000)}:R>`, inline: true }
                )
            .setTimestamp()
            interaction.followUp({embeds: [uptimeEmbed]})
    },
};