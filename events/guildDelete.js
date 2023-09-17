const { EmbedBuilder } = require('discord.js')

module.exports = async (client, guild) => {
    if (!guild || guild.available === false) return

    let theOwner;
    await guild.fetchOwner().then(({ user }) => {
        theOwner = user
    }).catch((e) => { console.log(e) })

    console.log('Left a Guild!')
    let embed = new EmbedBuilder()
        .setColor('Red')
        .setTitle(`${client.em.leave} Left a Server`)
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

    client.db.delete('autoroleuser')
    client.db.delete('autorolebot')
    client.db.delete('suggestions')
}