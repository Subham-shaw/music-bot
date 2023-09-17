const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js")

module.exports = {
    name: `poll`,
    description: `Held a poll for something`,
    category: `Moderation`,
    options: [
        {
            name: `text`,
            description: `What you want to held a poll for`,
            type: 3,
            required: true
        }
    ],
    run: async (client, interaction) => {
        let text = await interaction.options.getString(`text`)
        let embed = new EmbedBuilder().setColor(client.ee.color).setTitle(`<:poll:1115538070872268820>  Poll`).setDescription(`> ${text}`).setTimestamp()
        let up = 0, down = 0
        let row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('up').setLabel(`${up}`).setStyle(ButtonStyle.Success).setEmoji('👍'),
            new ButtonBuilder().setCustomId('down').setLabel(`${down}`).setStyle(ButtonStyle.Danger).setEmoji('👎'),

        )
        let msg = await interaction.channel.send({ embeds: [embed], components: [row] })
        interaction.reply({ content: `👍 Poll Helded`, ephemeral: true })

        let upArr = []
        let dwnArr = []


        const collector = await msg.createMessageComponentCollector({ filter: (i) => i?.isButton() });
        await collector.on('collect', async (b) => {

            switch (b.customId) {
                case 'up':
                    if (upArr.includes(`${b.user}`)) return;
                    if (dwnArr.includes(`${b.user}`)) {
                        down--
                        await arrayRemove(dwnArr, `${b.user}`)
                        up++
                        upArr.push(`${b.user}`)

                        let nRow = new ActionRowBuilder().addComponents(
                            new ButtonBuilder().setCustomId('up').setLabel(`${up}`).setStyle(ButtonStyle.Success).setEmoji('👍'),
                            new ButtonBuilder().setCustomId('down').setLabel(`${down}`).setStyle(ButtonStyle.Danger).setEmoji('👎'),

                        )
                        return b.update({ components: [nRow] })

                    }
                    up++
                    upArr.push(`${b.user}`)
                    let nRow = new ActionRowBuilder().addComponents(
                        new ButtonBuilder().setCustomId('up').setLabel(`${up}`).setStyle(ButtonStyle.Success).setEmoji('👍'),
                        new ButtonBuilder().setCustomId('down').setLabel(`${down}`).setStyle(ButtonStyle.Danger).setEmoji('👎'),

                    )
                    return b.update({ components: [nRow] })

                case 'down':
                    if (dwnArr.includes(`${b.user}`)) return;
                    if (upArr.includes(`${b.user}`)) {
                        up--
                        await arrayRemove(upArr, `${b.user}`)

                        down++
                        dwnArr.push(`${b.user}`)

                        let AnRow = new ActionRowBuilder().addComponents(
                            new ButtonBuilder().setCustomId('up').setLabel(`${up}`).setStyle(ButtonStyle.Success).setEmoji('👍'),
                            new ButtonBuilder().setCustomId('down').setLabel(`${down}`).setStyle(ButtonStyle.Danger).setEmoji('👎'),

                        )
                        return b.update({ components: [AnRow] })

                    }
                    down++
                    dwnArr.push(`${b.user}`)
                    let anRow = new ActionRowBuilder().addComponents(
                        new ButtonBuilder().setCustomId('up').setLabel(`${up}`).setStyle(ButtonStyle.Success).setEmoji('👍'),
                        new ButtonBuilder().setCustomId('down').setLabel(`${down}`).setStyle(ButtonStyle.Danger).setEmoji('👎'),

                    )

                    return b.update({ components: [anRow] })

            }
        })
    }
}

function arrayRemove(arr, value) {

    return arr.filter(function (ele) {
        return ele != value;
    });
}