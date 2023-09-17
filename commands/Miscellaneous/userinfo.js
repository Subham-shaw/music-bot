const { EmbedBuilder } = require('discord.js')
const moment = require('moment')

module.exports = {
    name: `userinfo`,
    description: `Get vast info about a user`,
    category: 'Miscellaneous',
    options: [{
        name: `user`,
        description: `The user you want to get info of`,
        type: 6,
        required: true
    }],

    run: async (client, interaction) => {
        await interaction.deferReply()
        const user = await interaction.options.getUser('user')
        let member = await interaction.guild.members.fetch(user)
        let av = await user.avatarURL()
        let Roles = member.roles.cache.map(r => `${r} `)
        let roles = member.roles.cache.map(r => `${r}`).join(' | ')
        let platform;
        let status = member.presence
        if (status) {
            if (status.status == 'online' || status.status == 'idle' || status.status == 'dnd') {
                platform = status.clientStatus
                if (platform) {
                    if (platform.mobile == 'online' || platform.mobile == 'idle' || platform.mobile == 'dnd') {
                        platform = 'Mobile'
                    } else if (platform.web == 'online' || platform.web == 'idle' || platform.web == 'dnd') {
                        platform = 'Browser'
                    } else if (platform.desktop == 'online' || platform.desktop == 'idle' || platform.desktop == 'dnd') {
                        platform = 'Desktop'
                    }
                }
            }

        } else {
            try {
                platform = 'None'
            } catch (e) {
                console.log(e)
            }
        } 

        let activity = member.presence
        let details
        if (activity) {
            details = await member.presence.activities[0].state
        }
        let embed = new EmbedBuilder()
            .setColor(member.displayHexColor).setThumbnail(av).setTimestamp().setAuthor({ name: `${user.tag}`, iconURL: `${av}` })
            .setFields(
                // { name: `<:Like:935540479313989662> Full Name:`, value: `> ${user.tag}`, inline: true },
                { name: `<:mentions:1114967629724123157> Mention:`, value: `> ${user}`, inline: true },
                { name: `<:invites:935538056524599296> UserID:`, value: `> \`${user.id}\``, inline: true },
                { name: `<:Like:935540479313989662> Nickname:`, value: `> ${member.nickname ? member.nickname : 'Not Set'}`, inline: true },
                { name: `<:BOT:950446949780307998> Bot:`, value: `> ${user.bot}`, inline: true },
                { name: `<a:nitro:956427353960116234> Booster:`, value: `> ${member.premiumSince ? 'true' : 'false'}`, inline: true },
                { name: `<a:info:950447233881489468> Created On:`, value: `> \`${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}\``, inline: false },
                { name: `<a:info:950447233881489468> Joined At:`, value: `> \`${moment.utc(user.joinedAt).format("dddd, MMMM Do YYYY")}\``, inline: false },
                { name: `${status ? '<a:online:960092774873587722>' : '<a:offline:968466723839823922>'} Status:`, value: `> ${status ? status.status : 'Offline'}`, inline: true },
                { name: `<:activity:1114967807495520316> Activity:`, value: `${activity ? `\`${details}\`` : `None`}`, inline: true },
                { name: `<:stage:1101397445998559322> Platform:`, value: `> ${platform}`, inline: true },
                { name: `<:Roles:935453098372108369> Roles (${Roles.length}):`, value: `>>> ${roles}`, inline: false },
            )
        return interaction.followUp({ embeds: [embed] })
    }
}