const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js')

module.exports = {
    name: `setup`,
    description: `Setup The Bot!`,
    category: `Setup`,
    options: [
        {
            name: `suggestions`,
            description: `Enable/Disable The Suggestions System`,
            type: 1,
            options: [{
                name: `channel`,
                description: `The Channel to send all suggestions`,
                type: 7,
                required: true,
            }],

        },
        {
            name: `autorolebot`,
            description: `Add a particular role When a bot joins the server`,
            type: 1,
            options: [{
                name: `role`,
                description: `Specify the role to add/remove!`,
                type: 8,
                required: true
            }],

        },
        {
            name: `autoroleuser`,
            description: `Add a particular role When a user joins the server`,
            type: 1,
            options: [{
                name: `role`,
                description: `Specify the role to add/remove!`,
                type: 8,
                required: true
            }],

        },
        {
            name: `statusrole`,
            description: `Gives a particular role on having a term in their status`,
            type: 1,
            options: [
                {
                    name: `term`,
                    description: `The Term to check in status`,
                    type: 3,
                    required: true,
                },
                {
                    name: `role`,
                    description: `The Role to add/remove`,
                    type: 8,
                    required: true,
                }
            ],

        },
        // {
        //     name: `ticket`,
        //     description: `Setup The Ticket System`,
        //     type: 1,
        //     options: [
        //         {
        //             name: `channel`,
        //             description: `The Channel To Setup The Creation of ticket`,
        //             type: 7,
        //             required: true,
        //         },
        //         {
        //             name: `opencategory`,
        //             description: `The Category Where The open `,
        //             type: 7,
        //             required: true,
        //         },
        //     ],

        // },
        // {
        //     name: ``,
        //     description: ``,
        //     type: 1,
        //     options: [{
        //         name: ``,
        //         description: ``,
        //         // type: ,
        //         required: true,
        //     }],

        // },
    ],

    run: async (client, interaction) => {
        let cmd = await interaction.options.getSubcommand()

        if (cmd == 'suggestions') {
            let ch = await interaction.options.getChannel('channel')

            if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({
                embeds: [
                    new EmbedBuilder().setColor('Red').setTitle(`${client.em.no} Permission Missing: \`ManageMessages\``)
                        .setDescription('You need Permission to use this command')
                ]
            })
            if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({
                embeds: [
                    new EmbedBuilder().setColor('Red').setTitle(`${client.em.no} Permission Missing: \`ManageMessages\``)
                        .setDescription('You need to give the bot the following permission to use this command')
                ]
            })


            const row = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('autorole')
                        .setPlaceholder('Select an Option!')
                        .addOptions(
                            {
                                label: 'Enable',
                                description: 'Enable The System',
                                value: '1',
                                emoji: {
                                    name: `yes`,
                                    id: `955817617510252544`
                                }
                            },
                            {
                                label: 'Disable',
                                description: `Disable The System`,
                                value: '2',
                                emoji: {
                                    name: `M_x`,
                                    id: `950441844544794654`
                                }
                            },
                        ),
                );

            let int = await interaction.reply({ content: `⚙️ Configure the Suggestion System through the Select-Menu`, components: [row] })

            const collector = await int.createMessageComponentCollector({ time: 60000, filter: (i) => i?.isStringSelectMenu() });
            await collector.on('collect', async (i) => {
                const selected = i.values[0]

                if (selected == '1') {
                    //db
                    await client.db.set(`${interaction.guild.id}`, {
                        suggestions: {
                            enabled: true,
                            channel: ch
                        },
                    })
                    await interaction.followUp({
                        embeds: [
                            new EmbedBuilder().setColor(client.ee.color).setTitle(`${client.em.yes} Suggestions Enabled!`).setDescription(`Now, Users can use \`/suggest\`.`)
                        ]
                    })
                    try { interaction.deleteReply() } catch { null }

                } else if (selected == '2') {
                    await client.db.set(`${interaction.guild.id}`, {
                        suggestions: {
                            enabled: false,
                            channel: undefined
                        },
                    })

                    await interaction.followUp({
                        embeds: [
                            new EmbedBuilder().setColor(client.ee.color).setTitle(`${client.em.yes} Suggestions Disabled!`)
                        ]
                    })
                    try { interaction.deleteReply() } catch { null }

                }
            })
        } else if (cmd == 'autorolebot') {
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

            const row = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('autorole')
                        .setPlaceholder('Select an Option!')
                        .addOptions(
                            {
                                label: 'Enable',
                                description: 'Enable The System',
                                value: '1',
                                emoji: {
                                    name: `yes`,
                                    id: `955817617510252544`
                                }
                            },
                            {
                                label: 'Disable',
                                description: `Disable The System`,
                                value: '2',
                                emoji: {
                                    name: `M_x`,
                                    id: `950441844544794654`
                                }
                            },
                        ),
                );

            interaction.reply({ content: `⚙️ Configure the AutoRole System through the Select-Menu\n> **Note**: Only 1 Role Can Be added, adding more roles will replace the old ones!`, components: [row] })

            const collector = await interaction.channel.createMessageComponentCollector({ time: 60000, filter: (i) => i?.isStringSelectMenu() });
            await collector.on('collect', async (i) => {
                const selected = i.values[0]

                if (selected == '1') {
                    //db
                    client.db.set(`${interaction.guild.id}`, {
                        autorolebot: {
                            enabled: true,
                            role: role
                        },
                    })
                    await interaction.followUp({
                        embeds: [
                            new EmbedBuilder().setColor(client.ee.color).setTitle(`${client.em.yes} AutoRole Enabled!`).setDescription(`Now, I'll add ${role} whenever a bot joins this server`)
                        ]
                    })
                    try { interaction.deleteReply() } catch { null }

                } else if (selected == '2') {
                    client.db.set(`${interaction.guild.id}`, {
                        autorolebot: {
                            enabled: false,
                            role: undefined
                        },
                    })

                    await interaction.followUp({
                        embeds: [
                            new EmbedBuilder().setColor(client.ee.color).setTitle(`${client.em.no} AutoRole Disabled!`)
                        ]
                    })
                    try { interaction.deleteReply() } catch { null }

                }
            })

        } else if (cmd == 'autoroleuser') {
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

            const row = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('autorole')
                        .setPlaceholder('Select an Option!')
                        .addOptions(
                            {
                                label: 'Enable',
                                description: 'Enable The System',
                                value: '1',
                                emoji: {
                                    name: `yes`,
                                    id: `955817617510252544`
                                }
                            },
                            {
                                label: 'Disable',
                                description: `Disable The System`,
                                value: '2',
                                emoji: {
                                    name: `M_x`,
                                    id: `950441844544794654`
                                }
                            },
                        ),
                );

            interaction.reply({ content: `⚙️ Configure the AutoRole System through the Select-Menu\n> **Note**: Only 1 Role Can Be added, adding more roles will replace the old ones!`, components: [row] })

            const collector = await interaction.channel.createMessageComponentCollector({ time: 60000, filter: (i) => i?.isStringSelectMenu() });
            await collector.on('collect', async (i) => {
                const selected = i.values[0]

                if (selected == '1') {
                    //db
                    client.db.set(`${interaction.guild.id}`, {
                        autoroleuser: {
                            enabled: true,
                            role: role
                        },
                    })
                    await interaction.followUp({
                        embeds: [
                            new EmbedBuilder().setColor(client.ee.color).setTitle(`${client.em.yes} AutoRole Enabled!`).setDescription(`Now, I'll add ${role} whenever a user joins this server`)
                        ]
                    })
                    try { interaction.deleteReply() } catch { null }

                } else if (selected == '2') {
                    client.db.set(`${interaction.guild.id}`, {
                        autoroleuser: {
                            enabled: false,
                            role: undefined
                        },
                    })

                    await interaction.followUp({
                        embeds: [
                            new EmbedBuilder().setColor(client.ee.color).setTitle(`${client.em.yes} AutoRole Disabled!`)
                        ]
                    })
                    try { interaction.deleteReply() } catch { null }

                }
            })

        } else if (cmd == 'statusrole') {
            let term = await interaction.options.getString(`term`)
            let role = await interaction.options.getRole(`role`)

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

            const row = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('statusrole')
                        .setPlaceholder('Select an Option!')
                        .addOptions(
                            {
                                label: 'Enable',
                                description: 'Enable The System',
                                value: '1',
                                emoji: {
                                    name: `yes`,
                                    id: `955817617510252544`
                                }
                            },
                            {
                                label: 'Disable',
                                description: `Disable The System`,
                                value: '2',
                                emoji: {
                                    name: `M_x`,
                                    id: `950441844544794654`
                                }
                            },
                        ),
                );

            await interaction.reply({ content: `⚙️ Configure the StatusRole System through the Select-Menu\n> **Note**: Only 1 Role Can Be added, adding more roles will replace the old ones!`, components: [row] })

            const collector = await interaction.channel.createMessageComponentCollector({ time: 60000, filter: (i) => i?.isStringSelectMenu() });
            await collector.on('collect', async (i) => {
                const selected = i.values[0]

                if (selected == '1') {
                    //db
                    client.db.set(`${interaction.guild.id}`, {
                        statusrole: {
                            enabled: true,
                            role: role,
                            term: term
                        }
                    })
                    await interaction.followUp({
                        embeds: [
                            new EmbedBuilder().setColor(client.ee.color).setTitle(`${client.em.yes} StatusRole Enabled!`).setDescription(`Now, I'll add ${role} whenever I find ${term} in their Status!`)
                        ]
                    })
                    try { interaction.deleteReply() } catch { null }

                } else if (selected == '2') {
                    client.db.set(`${interaction.guild.id}`, {
                        statusrole: {
                            enabled: false,
                            role: undefined,
                            term: undefined
                        }
                    })

                    await interaction.followUp({
                        embeds: [
                            new EmbedBuilder().setColor(client.ee.color).setTitle(`${client.em.yes} StatusRole Disabled!`)
                        ]
                    })
                    try { interaction.deleteReply() } catch { null }

                }
            })

        }
        // else if (cmd == '') {

        // }
    }
}