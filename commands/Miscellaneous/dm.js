const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: `dm`,
    description: `Dm a User!`,
    category: 'Miscellaneous',
    options: [
        {
            name: `user`,
            description: `The User You wan to DM`,
            type: 6,
            required: true
        },
        {
            name: `message`,
            description: `The Message you wan to send the user`,
            type: 3,
            required: true
        },
    ],

    run: async (client, interaction) => {
        await interaction.deferReply()
        let user = await interaction.options.getUser('user')
        let msg = await interaction.options.getString('message')

        try {
            await user.send({
                embeds: [
                    new EmbedBuilder().setColor(client.ee.color).setTitle(`✉️ You Got a DM!`)
                    .addFields(
                        { name: `Sent By:`, value: `> ${interaction.user} | ${interaction.user.id}`, inline: false },
                        { name: `Server:`, value: `> ${interaction.guild} | ${interaction.guild.id}`, inline: false },
                        { name: `Message:`, value: `\`\`\`${msg}\`\`\`` }
                    )
                ]
            })
            return interaction.followUp({embeds: [
                new EmbedBuilder().setColor(client.ee.color).setTitle(`${client.em.yes} Message Sent!`).setTimestamp()
                .setFields(
                    { name: `Sent To:`, value: `> ${user} | ${user.id}` },
                    { name: `Sent By:`, value: `> ${interaction.user} | ${interaction.user.id}` },
                    { name: `Message:`, value: `\`\`\`${msg}\`\`\``},
                )
            ]})
        } catch {
            return interaction.followUp({content: `🔴 ${user} Has DM closed, Better Luck Next Time!`})
        }
    }
}