const { EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
    name: `purge`,
    description: `Delete an amount of messages`,
    category: `Moderation`,
    options: [
        {
            name: `amount`,
            description: `Specify The amount of messages to be deleted`,
            type: 3,
            required: true
        }
    ],

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({
            embeds: [
                new EmbedBuilder().setColor('Red').setTitle(`${client.em.no} Permission Missing: \`ManageMessages\``)
                    .setDescription('You need to give the bot the following permission to use this command').setTimestamp()
            ]
        })
        let amount = interaction.options.get('amount').value
        let channel = interaction.channel

        const purgeEmbed = new EmbedBuilder()
            .setAuthor({
                name: interaction.member.displayName,
                iconURL: interaction.member.displayAvatarURL(),
            })
            .setColor(`Green`)
            .setTitle(`Deleted`)
            .setDescription(`Deleted ${amount} Messages in ${channel}`).setTimestamp()
        let err = false
        await channel.bulkDelete(amount).catch((e) => {
            err = true
            return interaction.reply({
                embeds: [
                    new EmbedBuilder().setColor('Red').setTitle(`${client.em.no} An Error Occured`).setTimestamp()
                    .setDescription(`\`\`\`${e}\`\`\``)
                ], ephemeral: true
            })
        })

        if (err == false) {
            return interaction.reply({
                embeds: [purgeEmbed],
                ephemeral: true
            })
        }


    }
}