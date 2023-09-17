const { EmbedBuilder } = require('discord.js')

module.exports = async (client, message) => {
    if (message.author.bot || !message.guild) return
    // let { prefix } = ;
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>)\\s*`); //When The Bot Gets Pinged In All These Formats Then It Replies Back
    if (!prefixRegex.test(message.content)) return
    const [matchedPrefix] = message.content.match(prefixRegex);
    const [cmdName, ...args] = message.content.slice(matchedPrefix.length).trim().split(/ +/g);

    if (args.length === 0) {
        if (matchedPrefix.includes(client.user.id))
            return message.reply({
                embeds: [new EmbedBuilder()
                    .setColor(client.ee.color)
                    .setTitle(`${client.em.yes} Thank For Pinging Me!`)
                    .setDescription(`Get an overview about me by using the follwing command:\n**\`/help\`**`)
                    .setTimestamp()
                ]
            }).catch(() => null);
    }
}