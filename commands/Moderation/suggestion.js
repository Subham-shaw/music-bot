const { EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
    name: `suggestion`,
    description: `Accept or Deny a Suggestion`,
    category: `Moderation`,
    options: [
        {
            name: `accept`,
            description: `Accept a Suggestion`,
            type: 1,
            options: [
                {
                    name: `messageid`,
                    description: `The Message ID of the Suggestion you want to accept`,
                    type: 3,
                    required: true
                },
                {
                    name: `reply`,
                    description: `Reply to the suggestion`,
                    type: 3,
                    required: true
                },
            ]
        },
        {
            name: `deny`,
            description: `Deny a Suggestion`,
            type: 1,
            options: [
                {
                    name: `messageid`,
                    description: `The Message ID of the Suggestion you want to accept`,
                    type: 3,
                    required: true
                },
                {
                    name: `reason`,
                    description: `The Reason To Reject this suggestion`,
                    type: 3,
                    required: true
                },
            ]
        },
    ],
    run: async (client, interaction) => {
        let cmd = await interaction.options.getSubcommand()
        let set = await client.db.get(`${interaction.guild.id}`, 'suggestions.enabled')

        if (set == false) { return interaction.reply({ content: `Suggestions is not set-up for this server yet.\n Set it by \`/setup-suggestions\``, ephemeral: true }) }

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({
            embeds: [
                new EmbedBuilder().setColor('Red').setTitle(`${client.em.no} Permission Missing: \`Administrator\``)
                    .setDescription('You need to the following permission to use this command').setTimestamp()
            ]
        })

        switch (cmd) {
            case 'accept':
                let id = await interaction.options.getString('messageid')
                let reply = await interaction.options.getString('reply')
                Nid = `${id}`

                let channel = await client.db.get(`${interaction.guild.id}`, 'suggestions.channel')
                channel = await interaction.guild.channels.cache.get(channel.id)

                let msg = await channel.messages.fetch(Nid).catch(e => {
                    return interaction.reply({
                        embeds: [ 
                            new EmbedBuilder().setColor('Red').setTitle(`${client.em.no} An Error Occured!`).setDescription(`\`\`\`${e}\`\`\``)
                        ], ephemeral: true
                    })
                });

                let t, user;

                try {
                    let MID = await client.db.get(`${msg.id}`)
                    let status = await client.db.get(`${msg.id}`, 'status')
                    t = await client.db.get(`${msg.id}`, 'title')
                    user = await client.db.get(`${msg.id}`, 'user')
                    avatarURL = await client.db.get(`${msg.id}`, 'avatarURL')
                    // user = await interaction.guild.members.cache.get(user.id)
                    if (status == 'denied') {
                        return interaction.reply({content: `${client.em.no} Suggestion Already Denied!`, ephemeral: true})
                    } else if (status == 'accepted') {
                        return interaction.reply({content: `${client.em.no} Suggestion Already Accepted!`, ephemeral: true})
                    }
                } catch (e) {
                    console.log(e)
                    return interaction.reply({content: `${client.em.no} No Suggestion Found!`, ephemeral: true})
                }
                
                const Athread = await channel.threads.cache.find(x => x.name === msg.id);
                await Athread.delete();

                msg.edit({
                    embeds: [
                        new EmbedBuilder().setColor('Green').setAuthor({ name: `${user.tag}`, iconURL: `${avatarURL}` }).setFields(
                            { name: `<a:info:950447233881489468> Feature:`, value: `\`\`\`${t}\`\`\``, inline: false },
                            { name: `🟢 Status:`, value: `> Accepted`, inline: false },
                            { name: `Reply:`, value: `\`\`\`${reply}\`\`\`` }
                        ).setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 1024 })).setTimestamp()
                        .setFooter({text: `Accepted By: ${interaction.user.tag}`, iconURL: `${interaction.user.avatarURL()}`})
                    ], components: []
                })
                await client.db.set(`${msg.id}`, {
                    status: `accepted`
                })
                
                return interaction.reply({ content: `${client.em.yes} Suggestion Accepted!`, ephemeral: true })
                break;

            case 'deny':
                let Mid = await interaction.options.getString('messageid')
                let reason = await interaction.options.getString('reason')
                Nid = `${Mid}`
                let ch = await client.db.get(`${interaction.guild.id}`, 'suggestions.channel')
                ch = await interaction.guild.channels.cache.get(ch.id)

                let Msg = await ch.messages.fetch(Nid).catch(e => {
                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder().setColor('Red').setTitle(`${client.em.no} An Error Occured!`).setDescription(`\`\`\`${e}\`\`\``)
                        ], ephemeral: true
                    })
                });

                let T, User;


                try {
                    let MID = await client.db.get(`${Msg.id}`)
                    let status = await client.db.get(`${Msg.id}`, 'status')
                    T = await client.db.get(`${Msg.id}`, 'title')
                    User = await client.db.get(`${Msg.id}`, 'user')
                    User = await interaction.guild.users.cache.get(User.id)
                    if (status == 'denied') {
                        return interaction.reply({content: `${client.em.no} Suggestion Already Denied!`, ephemeral: true})
                    } else if (status == 'accepted') {
                        return interaction.reply({content: `${client.em.no} Suggestion Already Accepted!`, ephemeral: true})
                    }
                } catch (e) {
                    console.log(e)
                    return interaction.reply({content: `${client.em.no} No Suggestion Found!`, ephemeral: true})
                }

                const thread = await ch.threads.cache.find(x => x.name === Msg.id);
                await thread.delete();

                Msg.edit({
                    embeds: [
                        new EmbedBuilder().setColor('Red').setAuthor({ name: `${User.tag}`, iconURL: `${User.avatarURL()}` }).setFields(
                            { name: `<a:info:950447233881489468> Feature:`, value: `\`\`\`${T}\`\`\``, inline: false },
                            { name: `🔴 Status:`, value: `> Rejected`, inline: true },
                            { name: `Reason:`, value: `\`\`\`${reason}\`\`\``, inline: false },
                        ).setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 1024 })).setTimestamp()
                        .setFooter({text: `Rejected By: ${interaction.user.tag}`, iconURL: `${interaction.user.avatarURL()}`})
                    ], components: []
                })

                await client.db.set(`${Msg.id}`, {
                    status: `denied`
                })

                return interaction.reply({ content: `${client.em.yes} Suggestion Rejected!`, ephemeral: true })
        }
    }
}