module.exports = async (client, interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        const cmd = client.commands.get(interaction.commandName);
        if (!cmd) return interaction.reply({ content: `${client.em.no} An error occured.`, ephemeral: true }).catch(() => null);
        const args = [];
        if (interaction.type == 4 && cmd.autocomplete) {
            try {
                await cmd.autocomplete(interaction);
            } catch (error) {
                console.error(error);
            }
        }

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id) || await interaction.guild.members.fetch(interaction.user.id).catch(() => null)

        cmd.run(client, interaction, args, "/");
    } else if (interaction.isAutocomplete()) {
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.autocomplete(interaction);
		} catch (error) {
			console.error(error);
		}
	}
}