const { EmbedBuilder } = require('discord.js')

module.exports = async (client, guild) => {
    console.log('Joined a Guild!')
    if (!guild || guild.available === false) return

    let theOwner;
    await guild.fetchOwner().then(({ user }) => {
        theOwner = user
    }).catch((e) => { console.log(e) })

    let embed = new EmbedBuilder()
        .setColor('Green')
        .setTitle(`${client.em.join} Joined a Server`)
        .addFields(
            { name: `**Guild Info**`, value: `>>> \`\`\`${guild.name} (${guild.id})\`\`\`` },
            { name: `**Owner Info**`, value: `>>> \`\`\`${theOwner ? `${theOwner.tag} (${theOwner.id})` : `${theOwner} (${guild.ownerId})`}\`\`\`` },
            { name: `**Member Count**`, value: `>>> \`\`\`${guild.memberCount}\`\`\`` },
            { name: `**Total Guilds**`, value: `>>> \`\`\`${client.guilds.cache.size}\`\`\`` },
        )
        .setThumbnail(guild.iconURL({ dynamic: true }));

    client.users.fetch(client.con.ownerId).then((user) => {
        user.send({ embeds: [embed] }).catch((e) => { console.log(e) })
    }).catch((e) => { console.log(e) })


    client.db.set(`${guild.id}`, {
        autoroleuser: {
            enabled: false,
            role: undefined
        },
        autorolebot: {
            enabled: false,
            role: undefined
        },
        suggestions: {
            enabled: false,
            channel: undefined,
            accepted: [],
            pending: [],
            denied: []
        },
        music: {
            volume: 75,
            afk: false
        },
        statusrole: {
            enabled: false,
            role: undefined, 
            term: undefined
        }
    })
}