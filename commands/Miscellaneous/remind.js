const { EmbedBuilder } = require("discord.js")
const moment = require('moment');

module.exports = {
    name: `remind`,
    description: `Reminds you about something after a particular amount of time`,
    category: 'Miscellaneous',
    options: [
        {
            name: `days`,
            description: `The Number of Days after which I should remind you`,
            type: 4,
            required: true
        },
        {
            name: `message`,
            description: `I should remind You What?`,
            type: 3,
            required: true
        }
    ],

    run: async (client, interaction) => {
        let now = moment();
        let relativeTime = now.startOf(Date.now()).fromNow();

        const time = await interaction.options.getInteger('days')
        const msg = await interaction.options.getString('message')

        const ms = await time * 86400000

        setTimeout(() => {
            interaction.user.send({
                embeds: [
                    new EmbedBuilder().setColor(client.ee.color).setTitle('⏰ Your Reminder').setFields(
                        { name: `Set on:`, value: `> ${relativeTime}`, inline: true },
                        { name: `Guild Channel:`, value: `> ${interaction.channel}`, inline: true },
                        { name: `Message:`, value: `>>> \`\`\`${msg}\`\`\``, inline: false }
                    )
                ]
            })
        }, ms)

        return interaction.reply({ content: `${client.em.yes} Your Reminder Has been set for ${time} days`, ephemeral: true })
    }
}