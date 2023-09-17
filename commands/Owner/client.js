const { EmbedBuilder } = require('discord.js')
const { VM } = require('vm2');

module.exports = {
    name: `client`,
    description: `Access The Bot's Previleged Commands`,
    category: `Owner`,
    options: [
        {
            name: `restart`,
            description: `Owner Only Command!!!`,
            type: 1
        },
        {
            name: `destroy`,
            description: `Owner Only Command!!!`,
            type: 1
        },
        {
            name: `leaveguild`,
            description: `Owner Only Command!!!`,
            type: 1,
            options: [{
                name: `id`,
                description: `Enter The Server ID`,
                type: 3,
                required: true
            }],
        },
        {
            name: `eval`,
            description: `Owner Only Command!!!`,
            type: 1,
            options: [{
                name: `code`,
                description: `The Code You want to check/evaluate`,
                type: 3,
                required: true,
            }],
        },
    ],

    run: async (client, interaction) => {
        if (interaction.user.id != client.con.ownerId) return interaction.reply({ content: `${client.em.no} Only My Owner is allowed to run this command`, ephemeral: true })
        let cmd = await interaction.options.getSubcommand()

        if (cmd == 'restart') {
            await interaction.reply(`${client.em.loading} Gotcha Master! Restarting ...`)
            client.destroy()
            client.login(client.con.token).then(() => {
                console.log('Restarted The Bot')
                return interaction.editReply(`${client.em.yes} Restarted`)
            })
        } else if (cmd == 'destroy') {
            return interaction.reply(`${client.em.yes} Gotcha Master! Shutting Down ...`)
                .then(m => {
                    client.destroy()
                })
        } else if (cmd == 'leaveguild') {
            await interaction.deferReply()
            const g = interaction.options.getString("id")
            const guild = await client.guilds.fetch(g)
            if (!guild) return interaction.reply('❌ No Guild Found')

            await guild.leave()
            return interaction.followUp('👍 Left the Guild!')

        } else if (cmd == 'eval') {
            await interaction.deferReply()
            let code = await interaction.options.getString('code')

            try {
                const vm = new VM({
                    timeout: 1000, // Set a maximum execution time for safety
                    sandbox: { client, interaction }, // Provide an empty sandbox to isolate the context
                });
                const compiledCode = await vm.run(`'use strict'; ${code}`);
                const result = await compiledCode;

                return interaction.followUp({
                    embeds: [
                        new EmbedBuilder().setColor('Green').setTitle(`${client.em.yes} Execution Successful!`).setTimestamp()
                            .addFields(
                                { name: `Input`, value: `\`\`\`js\n${code}\n\`\`\`` },
                                { name: `Output`, value: `\`\`\`js\n${result}\n\`\`\`` }
                            )
                    ]
                })
            } catch (error) {
                return interaction.followUp({
                    embeds: [
                        new EmbedBuilder().setColor('Red').setTitle(`${client.em.no} An Error Occured!`).setTimestamp()
                            .addFields(
                                { name: `Input`, value: `\`\`\`js\n${code}\n\`\`\`` },
                                { name: `Output`, value: `\`\`\`xl\n${error.message}\n\`\`\`` }
                            )
                    ]
                });
            }
        }
    }
}