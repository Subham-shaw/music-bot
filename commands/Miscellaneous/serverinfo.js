const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'Gathers All Info available about the server',
    category: 'Miscellaneous',
    
    run: async (client, interaction) => {
        let verifLevels = {
            "0": "None",
            "1": "Low",
            "2": "Medium",
            "3": "(╯°□°）╯︵  ┻━┻",
            "4": "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"
        }

        let tier = {
            "0": "None",
            "1": "TIER 1",
            "2": "TIER 2",
            "3": "**TIER 3**"
        }

        const members = await interaction.guild.members.fetch();
        let embed = new EmbedBuilder().setColor(client.ee.color).setTitle(`<a:fa_server:1101399533679816714> ${interaction.guild.name} | Server Information`)
        .setThumbnail(interaction.guild.iconURL({dynamic: true, size: 1024})).setImage(interaction.guild.bannerURL({ size: 1024 })).setTimestamp()
        .setFields(
            {
                name: "<a:info:950447233881489468> Server id:",
                value: `> ${interaction.guild.id}`,
                inline: true,
            },
            {
                name: "<a:Server_owner:1101399219903922238> Owner: ",
                value: `> <@!${interaction.guild.ownerId}>`,
                inline: true
            },
            {
                name: "<a:online_db:960092774873587722> Created on:",
                value: `> <t:${Math.round(interaction.guild.createdTimestamp / 1000)}>`,
                inline: false
            },
            {
                name: "<a:Discord:950441284148002816> Verify level: ",
                value: `> ${verifLevels[interaction.guild.verificationLevel]}`,
                inline: true
            },
            {
                name: "<a:nitro_logo:956427550035410994> Boost tier: ",
                value: `> ${tier[interaction.guild.premiumTier]}`,
                inline: true
            },
            {
                name: "<a:nitro:956427353960116234> Boost count:",
                value: `> ${interaction.guild.premiumSubscriptionCount || '0'} boosts`,
                inline: true
            },
            
            {
                name: "<:Like:935540479313989662> Members:",
                value: `> ${interaction.guild.memberCount} members`,
                inline: true
            },
            {
                name: "<:BOT:950446949780307998> Bots:",
                value: `> ${members.filter(member => member.user.bot).size} bots`,
                inline: true
            },
            {
                name: "<:Roles:935453098372108369> Roles:",
                value: `> ${interaction.guild.roles.cache.size} roles`,
                inline: true
            },
            {
                name: "<:Channel:935452640819699742> Text Channels: ",
                value: `> ${interaction.guild.channels.cache.filter(channel => channel.type === Discord.ChannelType.GuildText).size} channels`,
                inline: true
            },
            {
                name: "<a:Join_Vc:950792370306314321> Voice Channels:",
                value: `> ${interaction.guild.channels.cache.filter(channel => channel.type ===  Discord.ChannelType.GuildVoice).size} channels`,
                inline: true
            },
            {
                name: "<:stage:1101397445998559322> Stage Channels:",
                value: `> ${interaction.guild.channels.cache.filter(channel => channel.type ===  Discord.ChannelType.GuildStageVoice).size} channels`,
                inline: true
            },
            {
                name: "<:threadg:1101397761439580170> Public Threads:",
                value: `> ${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_PUBLIC_THREAD').size} threads`,
                inline: true
            },
            {
                name: "<a:threads:1101397710017417216> Private Threads:",
                value: `> ${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_PRIVATE_THREAD').size} threads`,
                inline: true
            },
            
            {
                name: "<a:Gift:956221378355400816> Emoji count:",
                value: `> ${interaction.guild.emojis.cache.size} emoji's`,
                inline: true
            },
        )
        return interaction.reply({embeds: [embed]})
    }
} 
