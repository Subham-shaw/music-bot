const ActionsClient = require('discord-actions');
const { EmbedBuilder } = require('discord.js');
const actions = new ActionsClient()

module.exports = {
    name: `a-yeet`,
    description: `Sends a GIF related to yeet`,
    category: `Anime Actions`,
    options: [{
        name: `user`,
        description: `The Person with whom you want to do this`,
        type: 6,
        required: true,
}],

    run: async(client, interaction) => {
        let user = await interaction.options.getUser('user')
        const action = await actions.sfw.yeet()

        interaction.reply({embeds: [
            new EmbedBuilder().setColor(client.ee.color).setDescription(`${interaction.user} Yeeted ${user}`).setImage(action.url)
        ]})
    }
}