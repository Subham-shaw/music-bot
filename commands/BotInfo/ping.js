const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    name: `ping`,
    description: `Get Bot's Latency`,
    category: `BotInfo`,
    
    run: async (client, interaction) => {
        const player = await client.manager.get(interaction.guild.id)
        await interaction.reply({ content: `${client.em.loading} Pinging the API ...` })
        const reply = await interaction.fetchReply()
        const ping = await reply.createdTimestamp - interaction.createdTimestamp
        let embed =  new EmbedBuilder()
        .setColor(client.ee.color)
        .setTimestamp()
        .setFields(
            { name: `${client.em.network} Websocket`, value: `> \`\`\`${Math.round(client.ws.ping)}ms\`\`\``, inline: true },
            { name: `<a:Discord:950441284148002816> Host<>Discord`, value: `> \`\`\`${ping}ms\`\`\``, inline: true },
        )

        if (player) {
            const playerPing = await player.wsPing
            embed.addFields(
                { name: `<:Lavalink:1114082982400106556> Player`, value: `> \`\`\`${player.wsPing}ms\`\`\``, inline: true },
            )
        }

        let row = new ActionRowBuilder().addComponents( new ButtonBuilder().setCustomId(`1`).setLabel(`Refresh`).setEmoji(`1116979110426710016`).setStyle(ButtonStyle.Primary))
        
       

        await interaction.editReply({ content: `🏓 Pong!`, embeds: [ embed ], components: [ row ] })
        //Add a Refresh button here!

    }
}