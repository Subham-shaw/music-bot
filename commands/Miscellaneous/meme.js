const memes = require("random-memes");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: `meme`,
    description: `Get Some Random Memes 😂`,
    category: 'Miscellaneous',

    run: async (client, interaction) => {
        await interaction.deferReply()
        memes.random().then(meme => {
            interaction.followUp({embeds: [
                new EmbedBuilder().setColor(client.ee.color).setTitle(`${meme.caption}`).setImage(`${meme.image}`)
            ]})
        })
    }
}