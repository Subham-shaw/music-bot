const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js')
const EasyMenu = require("easymenu-pages");

module.exports = {
    name: `help`,
    description: `Explains you how to use the bot with the help of a guide`,
    category: `BotInfo`,

    run: async (client, interaction) => {
        await interaction.deferReply()

        let date = new Date()
        let timestamp = date.getTime() - Math.floor(client.uptime);
        let main = new EmbedBuilder().setColor(client.ee.color).setTitle(`Help Information about me!`).setFields(
            { name: `🤖 Command Count:`, value: `> 62 Commands`, inline: true },
            { name: `${client.em.network} Ping:`, value: `> \`${client.ws.ping}ms\``, inline: true },
            { name: `${client.em.online} Uptime:`, value: `> <t:${Math.floor(timestamp / 1000)}:R>`, inline: true },
            { name: `<:Slash_Command:1110899410285645854> Command Categories`, value: `>>> <a:Moderation:1115155344528781392> Moderation\n<a:anime:1110892686178795520> Anime Actions\n<:infoo:1115155787640209428> BotInfo\n<:Games:1115156077131071520> Games\n<:utility:1115156851517030490> Miscellaneous\n<a:Music:950791431931457546> Music` },
            { name: `<:Like:935540479313989662> Info About Me!`, value: `>>> I am a Multipurpose Discord Bot, That Means that I am a combination of different bots which are made for diffferent purposes like Moderation, Music, etc. In order to use me, you need to use my slash commands. I also have a Dashbaord From Which Admins of a server can configure my commands. If you are unsatisfied with my features or want to suggest any, DM my owner Subham Shaw#1334 (DMs are open). Its My Honour to serve you!` },
        )

        let admin = new EmbedBuilder().setColor(client.ee.color).setTitle(`<a:Moderation:1115155344528781392> Moderation | 13 Commands`).setTimestamp()
            .setFields(
                { name: `/announcement`, value: `> Make an announcement through Embed`, inline: true },
                { name: `/purge`, value: `> Delete an amount of messages`, inline: true },
                { name: `/role`, value: `> Add a particular role to a user`, inline: true },
                { name: `/roleaddbots`, value: `> Add a particular role to all the bots in the server`, inline: true },
                { name: `/roleaddusers`, value: `> Add a particular role to all the users in the server`, inline: true },
                { name: `/roleremovebots`, value: `> Removes a particular role Form all the bots in the server`, inline: true },
                { name: `/roleremoveusers`, value: `> Removes a particular role From all the users in the server`, inline: true },
                { name: `/setup autorolebot`, value: `> Add a particular role When a bot joins the server`, inline: true },
                { name: `/setup autoroleuser`, value: `> Add a particular role When a user joins the server`, inline: true },
                { name: `/setup suggestions`, value: `> Enable/Disable The Suggestions System`, inline: true },
                { name: `/setup statusrole`, value: `> Adds a particular role whenever a user has a specific term in their status`, inline: true },
                { name: `/suggestion accept`, value: `> Accept a Suggestion`, inline: true },
                { name: `/suggestion deny`, value: `> Deny a Suggestion`, inline: true },
                
            )
        let anime = new EmbedBuilder().setColor(client.ee.color).setTitle(`<a:anime:1110892686178795520> Anime Actions | 18 Commands`).setTimestamp()
            .setFields(
                { name: `/a-bite`, value: `> Bite Someone`, inline: true },
                { name: `/a-bonk`, value: `> Bonk Someone`, inline: true },
                { name: `/a-bully`, value: `> Bully Someone`, inline: true },
                { name: `/a-cuddle`, value: `> Sends a GIF related to the Cuddle`, inline: true },
                { name: `/a-feed`, value: `> Feed Someone`, inline: true },
                { name: `/a-glomp`, value: `> Glomp Someone`, inline: true },
                { name: `/a-highfive`, value: `> High Five With any user`, inline: true },
                { name: `/a-holdhand`, value: `> Hold Hands with someone`, inline: true },
                { name: `/a-hug`, value: `> Hug Someone`, inline: true },
                { name: `/a-kick`, value: `> Kick A User`, inline: true },
                { name: `/a-kill`, value: `> Kill a User ☠️`, inline: true },
                { name: `/a-kiss`, value: `> Kiss Someone 💋`, inline: true },
                { name: `/a-lick`, value: `> Lick someone`, inline: true },
                { name: `/a-pat`, value: `> Pat any User`, inline: true },
                { name: `/a-poke`, value: `> Poke Someone`, inline: true },
                { name: `/a-slap`, value: `> Slap A User`, inline: true },
                { name: `/a-tickle`, value: `> Tickle someone`, inline: true },
                { name: `/a-yeet`, value: `> Yeet Someone`, inline: true },
            )
        let info = new EmbedBuilder().setColor(client.ee.color).setTitle(`<:infoo:1115155787640209428> BotInfo | 3 Commands`).setTimestamp()
            .setFields(
                { name: `/help`, value: `> Explains you how to use the bot with the help of a guide`, inline: true },
                { name: `/ping`, value: `> Get Bot's Latency`, inline: true },
                { name: `/uptime`, value: `> Show the Bot's uptime`, inline: true },
            )

        let games = new EmbedBuilder().setColor(client.ee.color).setTitle(`<:Games:1115156077131071520> Games | 9 Commands`).setTimestamp()
            .setFields(
                { name: `/2048`, value: `> 2048 is a tile-sliding puzzle game in which players combine numbers to reach the elusive 2048 tile`, inline: true },
                { name: `/fasttype`, value: `> FastType is a typing tool that tests and improves users' typing speed and accuracy.`, inline: true },
                { name: `/flood`, value: `> Flood is a challenging puzzle game where players fill a board with the same color`, inline: true },
                { name: `/matchpairs`, value: `> Match Pairs is a memory game where players flip over cards to find matching pairs`, inline: true },
                { name: `/minesweeper`, value: `> Minesweeper is a strategic game in which players avoid hidden mines while clearing a field.`, inline: true },
                { name: `/rockpaperscissors`, value: `> Rock Paper Scissors is a simple game in which players choose hand gestures to beat opponents`, inline: true },
                { name: `/snake`, value: `> Navigate a growing snake around obstacles, eat food, and gain points in the classic game of Snake`, inline: true },
                { name: `/ticktactoe`, value: `> Tic Tac Toe is a two-player game in which each player takes turns marking a 3x3 grid with Xs or Os`, inline: true },
                { name: `/trivia`, value: `> Trivia is a game in which players answer questions on various topics to score points.`, inline: true },
            )

        let utility = new EmbedBuilder().setColor(client.ee.color).setTitle(`<:utility:1115156851517030490> Miscellaneous | 10 Commands`).setTimestamp()
            .setFields(
                { name: `/ai`, value: `> An AI-Chat Module`, inline: true },
                { name: `/calculator`, value: `> Button-Based Calculator`, inline: true },
                { name: `/dm`, value: `> Dm a User!`, inline: true },
                { name: `/embed`, value: `> A Simple Embed Builder`, inline: true },
                { name: `/remind`, value: `> Reminds you about something after a particular amount of Days`, inline: true },
                { name: `/serverinfo`, value: `> Gathers All Info available about the server`, inline: true },
                { name: `/suggest`, value: `> Suggest The server about new Features`, inline: true },
                { name: `/userinfo`, value: `> Get vast info about a user`, inline: true },
                { name: `/meme`, value: `> Get Some Random Memes 😂`, inline: true },
                { name: `/emojify`, value: `> Emojify is a Discord tool that automatically replaces keywords in messages with appropriate emojis`, inline: true },
            )

            let music = new EmbedBuilder().setColor(client.ee.color).setTitle(`<a:Music:950791431931457546> Music | 9 Commands`).setTimestamp()
            .setFields(
                { name: `/player afk`, value: `> Stay AFK the current voice channel`, inline: true },
                { name: `/player applyfilter`, value: `> Apply Different Filters`, inline: true },
                { name: `/player destroy`, value: `> Stop The Music`, inline: true },
                { name: `/player loop`, value: `> Toggles the QueueRepeat`, inline: true },
                { name: `/player pause`, value: `> Pause the Current Song`, inline: true },
                { name: `/player resume`, value: `> Resume the Current Song`, inline: true },
                { name: `/player search`, value: `> Search For a Song to play`, inline: true },
                { name: `/player skip`, value: `> Skip The Current Song`, inline: true },
                { name: `/player volume`, value: `> Change the volume`, inline: true },
            )


        const menu = new EasyMenu({
            channel: interaction.channel,
            usersID: interaction.user.id, //it can also be an array
            pages: [
                {
                    name: "main",
                    message: {
                        content: "👍 Use The Select-Menu to Explore All The Commands!",
                        embeds: [main],
                        components: [
                            new ActionRowBuilder().addComponents(
                                new StringSelectMenuBuilder()
                                    .setCustomId("select")
                                    .setPlaceholder("Click To View Categories")
                                    .addOptions(
                                        new StringSelectMenuOptionBuilder().setLabel(`Moderation`).setValue('toAdmin').setEmoji('1115155344528781392'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Anime Actions`).setValue('toAnime').setEmoji('1110892686178795520'),
                                        new StringSelectMenuOptionBuilder().setLabel(`BotInfo`).setValue('toInfo').setEmoji('1115155787640209428'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Games`).setValue('toGames').setEmoji('1115156077131071520'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Miscellaneous`).setValue('toUtility').setEmoji('1115156851517030490'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Music`).setValue('toMusic').setEmoji('950791431931457546'),
                                    ),
                            ),
                            new ActionRowBuilder().addComponents(
                                new ButtonBuilder().setLabel(`Dashbaord`).setURL(`https://${client.con.Dashboard.domain}/`).setStyle(ButtonStyle.Link),
                            ),
                        ],
                    },
                    componentsActions: {
                        toAdmin: "admin",
                        toAnime: "anime",
                        toInfo: "info",
                        toGames: "games",
                        toUtility: "utility",
                        toMusic: `music`
                    },
                },
                {
                    name: "admin",
                    message: {
                        embeds: [admin],
                        components: [
                            new ActionRowBuilder().addComponents(
                                new StringSelectMenuBuilder()
                                    .setCustomId("1")
                                    .setPlaceholder("Click To View Other Categories")
                                    .addOptions(
                                        new StringSelectMenuOptionBuilder().setLabel(`Anime Actions`).setValue('toAnime').setEmoji('1110892686178795520'),
                                        new StringSelectMenuOptionBuilder().setLabel(`BotInfo`).setValue('toInfo').setEmoji('1115155787640209428'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Games`).setValue('toGames').setEmoji('1115156077131071520'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Miscellaneous`).setValue('toUtility').setEmoji('1115156851517030490'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Music`).setValue('toMusic').setEmoji('950791431931457546'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Main Page`).setValue('toMain').setEmoji('935452640819699742'),
                                    ),

                            ),
                        ],
                    },
                    componentsActions: {
                        toMain: `main`,
                        toAnime: "anime",
                        toInfo: "info",
                        toGames: "games",
                        toUtility: "utility",
                        toMusic: `music`
                        // edit: () => {
                        //     menu.msgMenu.edit({ content: "Wow", components: [] });
                        // },
                    },
                },
                {
                    name: "anime",
                    message: {
                        embeds: [anime],
                        components: [
                            new ActionRowBuilder().addComponents(
                                new StringSelectMenuBuilder()
                                    .setCustomId("2")
                                    .setPlaceholder("Click To View Other Categories")
                                    .addOptions(
                                        new StringSelectMenuOptionBuilder().setLabel(`Moderation`).setValue('toAdmin').setEmoji('1115155344528781392'),
                                        new StringSelectMenuOptionBuilder().setLabel(`BotInfo`).setValue('toInfo').setEmoji('1115155787640209428'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Games`).setValue('toGames').setEmoji('1115156077131071520'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Miscellaneous`).setValue('toUtility').setEmoji('1115156851517030490'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Music`).setValue('toMusic').setEmoji('950791431931457546'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Main Page`).setValue('toMain').setEmoji('935452640819699742'),
                                    ),
                            )
                        ],
                    },
                    componentsActions: {
                        toMain: `main`,
                        toAdmin: "admin",
                        toInfo: "info",
                        toGames: "games",
                        toUtility: "utility",
                        toMusic: `music`
                    },
                },
                {
                    name: "info",
                    message: {
                        embeds: [info],
                        components: [
                            new ActionRowBuilder().addComponents(
                                new StringSelectMenuBuilder()
                                    .setCustomId("3")
                                    .setPlaceholder("Click To View Other Categories")
                                    .addOptions(
                                        new StringSelectMenuOptionBuilder().setLabel(`Moderation`).setValue('toAdmin').setEmoji('1115155344528781392'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Anime Actions`).setValue('toAnime').setEmoji('1110892686178795520'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Games`).setValue('toGames').setEmoji('1115156077131071520'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Miscellaneous`).setValue('toUtility').setEmoji('1115156851517030490'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Music`).setValue('toMusic').setEmoji('950791431931457546'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Main Page`).setValue('toMain').setEmoji('935452640819699742'),
                                    ),

                            )
                        ],
                    },
                    componentsActions: {
                        toMain: `main`,
                        toAdmin: "admin",
                        toAnime: "anime",
                        toGames: "games",
                        toUtility: "utility",
                        toMusic: `music`
                    },
                },
                {
                    name: "games",
                    message: {
                        embeds: [games],
                        components: [
                            new ActionRowBuilder().addComponents(
                                new StringSelectMenuBuilder()
                                    .setCustomId("4")
                                    .setPlaceholder("Click To View Other Categories")
                                    .addOptions(
                                        new StringSelectMenuOptionBuilder().setLabel(`Moderation`).setValue('toAdmin').setEmoji('1115155344528781392'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Anime Actions`).setValue('toAnime').setEmoji('1110892686178795520'),
                                        new StringSelectMenuOptionBuilder().setLabel(`BotInfo`).setValue('toInfo').setEmoji('1115155787640209428'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Miscellaneous`).setValue('toUtility').setEmoji('1115156851517030490'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Music`).setValue('toMusic').setEmoji('950791431931457546'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Main Page`).setValue('toMain').setEmoji('935452640819699742'),
                                    ),

                            )
                        ],
                    },
                    componentsActions: {
                        toMain: `main`,
                        toAdmin: "admin",
                        toAnime: "anime",
                        toInfo: "info",
                        toUtility: "utility",
                        toMusic: `music`
                    },
                },
                {
                    name: "utility",
                    message: {
                        embeds: [utility],
                        components: [
                            new ActionRowBuilder().addComponents(
                                new StringSelectMenuBuilder()
                                    .setCustomId("5")
                                    .setPlaceholder("Click To View Other Categories")
                                    .addOptions(
                                        new StringSelectMenuOptionBuilder().setLabel(`Moderation`).setValue('toAdmin').setEmoji('1115155344528781392'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Anime Actions`).setValue('toAnime').setEmoji('1110892686178795520'),
                                        new StringSelectMenuOptionBuilder().setLabel(`BotInfo`).setValue('toInfo').setEmoji('1115155787640209428'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Games`).setValue('toGames').setEmoji('1115156077131071520'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Music`).setValue('toMusic').setEmoji('950791431931457546'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Main Page`).setValue('toMain').setEmoji('935452640819699742'),
                                    ),

                            )
                        ],
                    },
                    componentsActions: {
                        toMain: `main`,
                        toAdmin: "admin",
                        toAnime: "anime",
                        toInfo: "info",
                        toGames: "games",
                        toMusic: `music`
                    },
                },
                {
                    name: "music",
                    message: {
                        embeds: [music],
                        components: [
                            new ActionRowBuilder().addComponents(
                                new StringSelectMenuBuilder()
                                    .setCustomId("select")
                                    .setPlaceholder("Click To View Categories")
                                    .addOptions(
                                        new StringSelectMenuOptionBuilder().setLabel(`Moderation`).setValue('toAdmin').setEmoji('1115155344528781392'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Anime Actions`).setValue('toAnime').setEmoji('1110892686178795520'),
                                        new StringSelectMenuOptionBuilder().setLabel(`BotInfo`).setValue('toInfo').setEmoji('1115155787640209428'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Games`).setValue('toGames').setEmoji('1115156077131071520'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Miscellaneous`).setValue('toUtility').setEmoji('1115156851517030490'),
                                        new StringSelectMenuOptionBuilder().setLabel(`Main Page`).setValue('toMain').setEmoji('935452640819699742'),

                                    ),
                            ),
                        ],
                    },
                    componentsActions: {
                        toMain: `main`,
                        toAdmin: "admin",
                        toAnime: "anime",
                        toInfo: "info",
                        toGames: "games",
                        toUtility: "utility",
                    },
                },
            ],
        });

        interaction.deleteReply()
        menu.start();

        menu.on("collectorEnd", () => console.log("Menu: finished the menu collector"));

        // menu.on("pageChange", (oldPage, newPage) => console.log(`Menu: page change from ${oldPage.name} to ${newPage.name}`)); //new (I think it could be useful if you know how to use it well)
    }
}