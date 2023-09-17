const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')

module.exports = {
    name: `suggest`,
    description: `Suggest The server about new Features`,
    category: 'Miscellaneous',
    options: [
        {
            name: `feature`,
            description: `The Name Of the feature`,
            type: 3,
            required: true
        },
    ],

    run: async (client, interaction) => {
        let t = await interaction.options.getString('feature')
        let set = await client.db.get(`${interaction.guild.id}`, 'suggestions.enabled')

        if (set == false) { return interaction.reply({ content: `Suggestions is not set-up for this server yet.\n Set it by \`/setup-suggestions\``, ephemeral: true }) }
        let ch = await client.db.get(`${interaction.guild.id}`, 'suggestions.channel')
        let channel = await interaction.guild.channels.cache.get(ch.id)
        let up = 0, down = 0
        let embed = new EmbedBuilder().setColor('Yellow').setFields(
            { name: `<a:info:950447233881489468> Feature:`, value: `\`\`\`${t}\`\`\``, inline: false },
            { name: `🟡 Status:`, value: `> Pending`, inline: false },
        ).setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 1024 })).setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.avatarURL()}` })



        let row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('up').setLabel(`${up}`).setStyle(ButtonStyle.Success).setEmoji('👍'),
            new ButtonBuilder().setCustomId('down').setLabel(`${down}`).setStyle(ButtonStyle.Danger).setEmoji('👎'),

        )

        let msg = await channel.send({ embeds: [embed], components: [row] })
        interaction.reply({ content: `${client.em.yes} Suggestion Sent!\nMessage id: \`${msg.id}\``, ephemeral: true })
        await client.db.set(`${msg.id}`, {
            status: `pending`,
            title: t,
            user: interaction.user,
            avatarURL: interaction.user.avatarURL()
        })

        let upArr = []
        let dwnArr = []

        const thread = await msg.startThread({
            name: `${msg.id}`,
            autoArchiveDuration: 60,
            reason: `${t}`,
        });
        await thread.members.add(`${interaction.user.id}`)

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
                    await thread.members.add(b.user.id)
                    return b.update({ components: [nRow] })


                    break;

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

                    await thread.members.add(b.user.id)
                    return b.update({ components: [anRow] })


                    break;

                // case 'accept':

                //     break;

                // case '':

                //     break;
            }
        })

    }


}

function arrayRemove(arr, value) {

    return arr.filter(function (ele) {
        return ele != value;
    });
}