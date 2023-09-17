const { Emojify } = require('discord-gamecord');

module.exports = {
    name: `emojify`,
    description: `Emojify is a Discord tool that automatically replaces keywords in messages with appropriate emojis`,
    category: 'Miscellaneous',
    options: [{
        name: `text`,
        description: `Enter the text you want to Emojify`,
        type: 3,
        required: true,
      }],

    run: async (client, interaction) => {
        const Text = await interaction.options.getString('text')
        let emoji = await Emojify(Text).catch(()=> {
            return interaction.reply(`Well, I think That wasn't a text, right?`)
        })
        return interaction.reply(emoji)
    }
}