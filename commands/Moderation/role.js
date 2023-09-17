const { EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
    name: `role`,
    description: `Add a particular role to a user`,
    category: `Moderation`,
    options: [
        {
            name: `user`,
            description: `The user you to add the role`,
            type: 6,
            required: true,
        },
        {
            name: `role`,
            description: `Specify the role to add!`,
            type: 8,
            required: true
        }
    ],

    run: async (client, interaction) => {
        await interaction.deferReply()
        const role = await interaction.options.getRole('role')
        const user = await interaction.options.getRole('user')
        const User = await interaction.guild.members.cache.get(user.id)
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.followUp({
            embeds: [
                new EmbedBuilder().setColor('Red').setTitle(`${client.em.no} Permission Missing: \`ManageRoles\``)
                    .setDescription('You need to give the bot the following permission to use this command')
            ]
        })
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.followUp({
            embeds: [
                new EmbedBuilder().setColor('Red').setTitle(`${client.em.no} Permission Missing: \`ManageRoles\``)
                    .setDescription('You need The Following Permission to use this command, Pal!')
            ]
        })

        let error = false
        User.roles.add(role).catch((e) => error = true)

        switch (error) {
            case true:
                return interaction.followUp({
                    embeds: [
                        new EmbedBuilder().setColor('Red').setTitle(`${client.em.no} Role Greater Than Mine!`)
                            .setDescription(`You need to keep my role above all role (Under Owner)`)
                    ]
                })
            
            case false: 
                return interaction.followUp({
                    embeds: [
                        new EmbedBuilder().setColor('Green').setTitle(`${client.em.yes} Role Successfully Add!`).setTimestamp()
                        .setDescription(`${role} added to ${user}`)
                    ]
                })

        }
    }

}