const { EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
    name: `roleaddbots`,
    description: `Add a particular role to all the bots in the server`,
    category: `Moderation`,
    options: [
        {
            name: `role`,
            description: `Specify the role to add!`,
            type: 8,
            required: true
        }
    ],

    run: async (client, interaction) => {
        const role = await interaction.options.getRole('role')
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({
            embeds: [
                new EmbedBuilder().setColor('Red').setTitle(`${client.em.no} Permission Missing: \`ManageRoles\``)
                    .setDescription('You need to give the bot the following permission to use this command')
            ]
        })
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({
            embeds: [
                new EmbedBuilder().setColor('Red').setTitle(`${client.em.no} Permission Missing: \`ManageRoles\``)
                    .setDescription('You need The Following Permission to use this command, Pal!')
            ]
        })
        let error = false
        const allMembers = await interaction.guild.members.fetch()
        const members = await allMembers.filter(member => member.user.bot)
        await interaction.guild.members.me.roles.add(role).catch(() => {
            error = true

        })

        switch (error) {
            case true:
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder().setColor('Red').setTitle(`${client.em.no} Role Greater Than Mine!`)
                            .setDescription('You Need to place my role above all roles to use this command').setTimestamp()
                    ]
                })

            case false:
                let em = new EmbedBuilder().setColor(client.ee.color).setTitle(`${client.em.yes} Role Added to ${members.size} Bots`)
                .setDescription(`Here's the list of the Bots:`).setTimestamp()
                await members.forEach(member => {
                    member.roles.add(role)
                    em.addFields(
                        {
                            name: ` `, value: `<@${member.id}>`, inline: true
                        },
                    )

                })
                return interaction.reply({ embeds: [em] })
        }



    }
}