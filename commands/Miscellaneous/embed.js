const { EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    name: `embed`,
    description: `A Simple Embed Builder`,
    category: 'Miscellaneous',
    options: [
        {
            name: `title`,
            description: `Title of the embed (dont't add mentions in title, looks horrible)`,
            type: 3,
            required: true
        },
        {
            name: `description`,
            description: `Description of the embed`,
            type: 3,
            required: true
        }
    ],

    run: async(client, interaction) => {
        // const modal = new ModalBuilder()
        // .setCustomId('myModal')
        // .setTitle('My Modal');

        // const color = new TextInputBuilder().setCustomId('color').setLabel("Color of the Embed [Only Hex Code Allowed]").setStyle(TextInputStyle.Short);
        // const title = new TextInputBuilder().setCustomId('title').setLabel("Title of the Embed [Don't Use Mentions]").setStyle(TextInputStyle.Short);
		// const description = new TextInputBuilder().setCustomId('description').setLabel("Description of the Embed").setStyle(TextInputStyle.Paragraph);
        // const btnName = new TextInputBuilder().setCustomId('btnName').setLabel("Button Name").setStyle(TextInputStyle.Short).setRequired(false);
        // const btnURL = new TextInputBuilder().setCustomId('btnURL').setLabel("Button URL").setStyle(TextInputStyle.Short).setRequired(false);
            
        // const ActionRow0 = new ActionRowBuilder().addComponents(color);
        // const ActionRow1 = new ActionRowBuilder().addComponents(title);
		// const ActionRow2 = new ActionRowBuilder().addComponents(description);
		// const ActionRow3 = new ActionRowBuilder().addComponents(btnName);
		// const ActionRow4 = new ActionRowBuilder().addComponents(btnURL);

        // modal.addComponents(ActionRow0, ActionRow1, ActionRow2, ActionRow3, ActionRow4);

        // await interaction.showModal(modal);


        const title = await interaction.options.getString('title')
        const description = await interaction.options.getString('description')

        let embed = new EmbedBuilder().setColor(client.ee.color).setTitle(`${title}`).setDescription(`>>> ${description}`).setThumbnail(interaction.guild.iconURL({dynamic: true, size: 1024}))
        return interaction.reply({embeds: [embed]})
    }
}