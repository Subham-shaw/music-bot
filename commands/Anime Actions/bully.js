const ActionsClient = require('discord-actions');
const { EmbedBuilder } = require('discord.js');
const actions = new ActionsClient()

module.exports = {
    name: `a-bully`,
    description: `Sends a GIF related to bully`,
    category: `Anime Actions`,
    options: [{
        name: `user`,
        description: `The Person with whom you want to do this`,
        type: 6,
        required: true,
}],

    run: async(client, interaction) => {
        const action = await actions.sfw.bully()
        let user = await interaction.options.getUser('user')

        interaction.reply({embeds: [
            new EmbedBuilder().setColor(client.ee.color).setDescription(`${interaction.user} Bullied ${user}`).setImage(action.url)
        ]})
    }
}