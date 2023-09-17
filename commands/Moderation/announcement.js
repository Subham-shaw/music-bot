const { EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
    name: `announce`,
    description: `Make an announcement through Embed`,
    category: `Moderation`,
    options: [
        {
            name: `channel`,
            description: `The Channel to send the embed`,
            type: 7,
            required: true
        },
        {
            name: `role`,
            description: `The Role to ping`,
            type: 8,
            required: true
        },
        {
            name: `title`,
            description: `Title of the embed (dont't add mentions in title, looks horrible)`,
            type: 3,
            required: true
        },
        {
            name: `description`,
            description: `Description of the embed`,
            type: 3,
            required: true
        }
    ],

    run: async(client, interaction) => {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({
            embeds: [
                new EmbedBuilder().setColor('Red').setTitle(`${client.em.no} Permission Missing: \`ManageMessages\``)
                    .setDescription('You need to the following permission to use this command').setTimestamp()
            ]
        })

        const title = await interaction.options.getString('title')
        const description = await interaction.options.getString('description')
        let ch = await interaction.options.getChannel('channel')
        const role = await interaction.options.getRole('role')

        let embed = new EmbedBuilder().setColor(client.ee.color).setTitle(`${title}`).setDescription(`>>> ${description}`)
        await ch.send({content: `${role}`, embeds: [embed]})
        return interaction.reply({content: `${client.em.yes} Embed Sent at <#${ch.id}>`, ephemeral: true})
    }
}