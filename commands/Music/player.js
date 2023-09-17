const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js')
const fetch = require('isomorphic-unfetch')
const { getPreview } = require('spotify-url-info')(fetch)

module.exports = {
    name: `player`,
    description: `Access All The Music commands`,
    category: `Music`,
    options: [
        {
            name: `afk`,
            description: `Stay AFK the current voice channel`,
            type: 1,
        },
        {
            name: `applyfilter`,
            description: `Apply Different Filters`,
            type: 1,
        },
        {
            name: `destroy`,
            description: `Stop The Music`,
            type: 1,
        },
        {
            name: `loop`,
            description: `Toggles the QueueRepeat`,
            type: 1,
        },
        {
            name: `pause`,
            description: `Pause the Current Song`,
            type: 1,
        },
        {
            name: `resume`,
            description: `Resume the Current Song`,
            type: 1,
        },
        {
            name: `search`,
            description: `Search For a Song to play`,
            type: 1,
            options: [{
                name: `query`,
                description: `The Name/Link of the song`,
                type: 3,
                required: true
            }]
        },
        {
            name: `skip`,
            description: `Skip The Current Song`,
            type: 1,
        },
        {
            name: `volume`,
            description: `Change the volume`,
            type: 1,
            options: [{
                name: `set`,
                description: `Set The Volume Between 0 and 150`,
                type: 4,
                required: true
            }],
        },
        // {
        //     name: `audiooutput`,
        //     description: `Change The Dimension of the music`,
        //     type: 1,
        //     options: [{
        //         name: `direction`,
        //         description: `Change The Music Dimension to Right/Left side`
        //         type: 3,
        //         required: true
        //     }]
        // },

    ],

    run: async (client, interaction) => {
        let cmd = await interaction.options.getSubcommand()

        if (cmd == 'search') {
            let format = client.fnc.format
            const q = await interaction.options.getString('query')
            let voice = interaction.member.voice.channel
            if (!voice) {
                return interaction.reply({
                    embeds: [new EmbedBuilder().setColor('Red').setTitle(`${client.em.no} No Voice Found!`)
                        .setDescription('You need to join a voice channel to play some music.').setTimestamp()], ephemeral: true
                })
            }
            let oldPlayer = client.manager.get(interaction.guild)
            if (oldPlayer) {
                if (!oldPlayer.playing || !oldPlayer.paused) await oldPlayer.destroy
            }

            await interaction.deferReply()
            const player = await client.manager.create({
                region: interaction.member.voice.channel?.rtcRegion || undefined,
                guild: interaction.guild.id,
                voiceChannel: voice.id, // message.member.voice.channel.id,
                textChannel: interaction.channel.id,
                selfDeafen: true,
                instaUpdateFiltersFix: true,
            })

            // join vc
            if (!player.connected) {
                await player.connect();
                await player.stop();
            }

            const res = await player.search({ query: q }, interaction.user)
            if (!res.tracks[0]) return interaction.followUp({
                embeds: [
                    new EmbedBuilder().setColor('Red').setTitle(`${client.em.no} No Matches Found`).setTimestamp()
                        .setDescription(`Nothing Found For \n \`\`\`${q}\`\`\``)
                ]
            });

            if (res.loadType == 'PLAYLIST_LOADED') {
                player.queue.add(res.tracks)
                let Embed = new EmbedBuilder().setColor('LuminousVividPink').setTitle(`${client.em.queueAdd} Added To Queue ${player.queue.totalSize} Songs`)
                    .setDescription(`> ${client.em.duration} **Duration: **\`${format(player.queue.duration)}\`\n> ${client.em.artist} **Artist: **\`${res.author}\`\n> ${client.em.requester} **Requested By: **${interaction.user}`)
                await getPreview(q).then(data => Embed.setThumbnail(data.image)).catch((e) => { null })

                await interaction.followUp({
                    embeds: [Embed]
                })

            } else {
                await player.queue.add(res.tracks[0])
                let embed = new EmbedBuilder().setColor('LuminousVividPink').setTitle(`${client.em.queueAdd} Added To Queue: _${res.tracks[0].title}_`)
                    .setDescription(`> ${client.em.duration} **Duration: **\`${format(res.tracks[0].duration)}\`\n> ${client.em.artist} **Artist: **\`${res.tracks[0].author}\`\n> ${client.em.requester} **Requested By: **${interaction.user}`)
                await getPreview(q).then(data => embed.setThumbnail(data.image)).catch((e) => { null })

                if (player.paused || player.playing) {
                    await interaction.followUp({
                        embeds: [embed]
                    })


                }
            }

            if (!player.playing && !player.paused) {
                await player.play()
                await interaction.editReply('👍 Found The Song!')
                let settings = new EmbedBuilder().setColor('LuminousVividPink').addFields(
                    { name: `${client.em.joinVoice} **Voice Channel Connected**`, value: `> <#${player.voiceChannel}>`, inline: true },
                    { name: `${client.em.textChannel} **Bounded Text-Channel**`, value: `> <#${player.textChannel}>`, inline: true },
                    { name: `${client.em.requester} **Player - Creator**`, value: `> ${res.tracks[0].requester}`, inline: true },
                    { name: `${client.em.volumeUp} **Volume**`, value: `> \`${player.volume}%\``, inline: true },
                    { name: `${client.em.network} **Bot Ping**`, value: `> \`${client.ws.ping}ms\``, inline: true },
                )

                await player.set('textChannel', interaction.channel)
                return interaction.editReply({ embeds: [settings] })
            }

        } else if (cmd == 'destroy') {
            await checkPlayer()
            const player = client.manager.get(interaction.guild.id);


            const { channel } = interaction.member.voice;

            if (channel.id !== player.voiceChannel) return interaction.reply({
                embeds: [
                    new EmbedBuilder().setColor(`Red`).setTitle(`${client.em.no} Not In Same Voice`)
                        .setDescription(`You have to be in the same voice channel as mine to stop the music`)
                ]
            });

            await player.destroy();
            await interaction.reply({
                embeds: [new EmbedBuilder().setColor('LuminousVividPink').setTitle(`${client.em.stop} Player Destroyed!`).setDescription(`Destroyed the player and left the Voice Channel`)]
            });
            setTimeout(() => {
                return interaction.deleteReply().catch((e) => { null })
            }, 5000)
        } else if (cmd == 'skip') {
            await checkPlayer()
            const player = client.manager.get(interaction.guild.id);


            const { channel } = interaction.member.voice;

            if (channel.id !== player.voiceChannel) return interaction.reply({
                embeds: [
                    new EmbedBuilder().setColor(`Red`).setTitle(`${client.em.no} Not In Same Voice`)
                        .setDescription(`You have to be in the same voice channel as mine to skip the song`)
                ]
            });

            await player.stop();
            await interaction.reply({
                embeds: [new EmbedBuilder().setColor('LuminousVividPink').setTitle(`${client.em.stop} Skipped to the next Song!`)]
            });
            setTimeout(() => {
                return interaction.deleteReply().catch((e) => { null })
            }, 5000)
        } else if (cmd == 'volume') {
            const vol = interaction?.options.getInteger("set")
            await checkPlayer()
            const player = client.manager.get(interaction.guild.id);

            if (vol <= 150) {
                player.setVolume(vol)
                    .catch((e) => {
                        console.log(e)
                    })
                await interaction.reply({
                    embeds: [
                        new EmbedBuilder().setColor('LuminousVividPink').setTitle(`${client.em.yes} Volume Changed To \`${vol}\``)
                    ]
                })
                setTimeout(() => {
                    return interaction.deleteReply().catch((e) => { null })
                }, 5000)

            } else {
                return interaction.reply({
                    embeds: [new EmbedBuilder().setColor(`Red`).setTitle(`${client.em.no} Volume must be between 0 and 150`)]
                })
            }
        } else if (cmd == 'pause') {
            await checkPlayer()
            const player = client.manager.get(interaction.guild.id);


            if (player.paused) {
                return interaction.reply({
                    embeds: [new EmbedBuilder().setColor(`Red`).setTitle(`${client.em.no} Player Already Paused!`)]
                })
            } else {
                player.pause(true)
                await interaction.reply({
                    embeds: [new EmbedBuilder().setColor(`LuminousVividPink`).setTitle(`${client.em.tick} Player Paused!`)]
                })
                setTimeout(() => {
                    return interaction.deleteReply().catch((e) => { null })
                }, 5000)
            }
        } else if (cmd == 'resume') {
            await checkPlayer()
            const player = client.manager.get(interaction.guild.id);


            if (!player.paused) {
                return interaction.reply({
                    embeds: [new EmbedBuilder().setColor(`Red`).setTitle(`${client.em.no} Player isn't Paused!`)]
                })
            } else {
                player.pause(false)
                await interaction.reply({
                    embeds: [new EmbedBuilder().setColor(`LuminousVividPink`).setTitle(`${client.em.tick} Player Resumed!`)]
                })
                setTimeout(() => {
                    return interaction.deleteReply().catch((e) => { null })
                }, 5000)
            }
        } else if (cmd == 'loop') {
            await checkPlayer()
            const player = client.manager.get(interaction.guild.id);

            if (player.queueRepeat == false) {
                player.setQueueRepeat(true)
                await interaction.reply({
                    embeds: [new EmbedBuilder().setColor(`LuminousVividPink`).setTitle(`${client.em.tick} Loop Enabled!`)]
                })
                setTimeout(() => {
                    return interaction.deleteReply().catch((e) => { null })
                }, 5000)
            } else {
                player.setQueueRepeat(false)
                await interaction.reply({
                    embeds: [new EmbedBuilder().setColor(`LuminousVividPink`).setTitle(`${client.em.tick} Loop Disabled!`)]
                })
                setTimeout(() => {
                    return interaction.deleteReply().catch((e) => { null })
                }, 5000)
            }
        } else if (cmd == 'applyfilter') {
            await checkPlayer()

            const row = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('filters')
                        .setPlaceholder('Selet Filter To Apply')
                        .setMinValues(1)
                        .addOptions(
                            {
                                label: '8D',
                                description: '8 Dimentional Experience',
                                value: '1',
                                emoji: {
                                    name: `Number_1`,
                                    id: `1088112890290110524`
                                }
                            },
                            {
                                label: 'Tremolo',
                                description: `Creates a Rhythmic Fluctuation in Volume`,
                                value: '2',
                                emoji: {
                                    name: `Number_2`,
                                    id: `1088112956362997840`
                                }
                            },
                            {
                                label: 'Karaoke',
                                description: 'Removes the Vocals from the Music',
                                value: '3',
                                emoji: {
                                    name: `Number_3`,
                                    id: `1088112912029208576`
                                }
                            },
                            {
                                label: 'Low Pass',
                                description: 'Eliminate high-frequency noise or distortion',
                                value: '4',
                                emoji: {
                                    name: `Number_4`,
                                    id: `935048710931484703`
                                }
                            },
                            {
                                label: 'Nightcore',
                                description: 'Speed up Tempo and pitch',
                                value: '5',
                                emoji: {
                                    name: `Number_5`,
                                    id: `1088113343950233600`
                                }
                            },
                            {
                                label: 'Vibrato',
                                description: 'Applies The Vibrate Effect',
                                value: '6',
                                emoji: {
                                    name: `Number_6`,
                                    id: `935048927722471516`
                                }
                            },
                            {
                                label: 'Reset',
                                description: 'Reset All Filters',
                                value: '7',
                                emoji: {
                                    name: `Cross`,
                                    id: `1081081015566602290`
                                }
                            },
                        ),
                );

            let msg = await interaction.reply({ components: [row] })
            setTimeout(() => {
                return interaction.deleteReply().catch((e) => { null })
            }, 60000)
            const collector = await msg.createMessageComponentCollector({ time: 60000, filter: (i) => i?.isStringSelectMenu() });
            await collector.on('collect', async (i) => {
                if (player) {
                    const selected = i.values[0]
                    if (selected == '1') {
                        await player.toggleRotating()
                        return i.reply({
                            embeds: [
                                new EmbedBuilder().setColor(client.ee.color).setTitle(`${client.em.tick} Applied 8D!`)
                            ]
                        })
                    } else if (selected == '2') {
                        await player.toggleTremolo()
                        return i.reply({
                            embeds: [
                                new EmbedBuilder().setColor(client.ee.color).setTitle(`${client.em.tick} Applied Tremolo!`)
                            ]
                        })

                    } else if (selected == '3') {
                        await player.toggleKaraoke()
                        return i.reply({
                            embeds: [
                                new EmbedBuilder().setColor(client.ee.color).setTitle(`${client.em.tick} Applied Karaoke!`)
                            ]
                        })

                    } else if (selected == '4') {
                        await player.toggleRotating()
                        return i.reply({
                            embeds: [
                                new EmbedBuilder().setColor(client.ee.color).setTitle(`${client.em.tick} Applied Low Pass!`)
                            ]
                        })

                    } else if (selected == '5') {
                        await player.toggleNightcore()
                        return i.reply({
                            embeds: [
                                new EmbedBuilder().setColor(client.ee.color).setTitle(`${client.em.tick} Applied Nightcore!`)
                            ]
                        })

                    } else if (selected == '6') {
                        await player.toggleLowPass()
                        return i.reply({
                            embeds: [
                                new EmbedBuilder().setColor(client.ee.color).setTitle(`${client.em.tick} Applied Vibrato!`)
                            ]
                        })

                    } else if (selected == '7') {
                        await player.resetFilters();
                        return i.reply({
                            embeds: [
                                new EmbedBuilder().setColor(client.ee.color).setTitle(`${client.em.tick} Removed All Filters!`)
                            ]
                        })

                    }
                }
            })


        } else if (cmd == 'afk') {
            await checkPlayer()
            let set = await client.db.get(`${interaction.guild.id}`, 'music.afk')

            if (set == true) {
                await client.db.set(`${interaction.guild.id}`, { music: { afk: false } })
                await interaction.reply({
                    embeds: [
                        new EmbedBuilder().setColor(`LuminousVividPink`).setTitle(`${client.em.tick} Afk Mode Disabled!`)
                    ]
                })

            } else {
                await client.db.set(`${interaction.guild.id}`, { music: { afk: true } })
                await interaction.reply({
                    embeds: [
                        new EmbedBuilder().setColor(`LuminousVividPink`).setTitle(`${client.em.tick} Afk Mode Enabled!`)
                    ]
                })
            }
            setTimeout(() => {
                return interaction.deleteReply().catch((e) => { null })
            }, 5000)

        }


        function checkPlayer() {
            const player = client.manager.get(interaction.guild.id);
            if (!player) return interaction.reply({
                embeds: [new EmbedBuilder().setColor(`Red`).setTitle(`${client.em.no} **No PLayer Found!**`)]
            })
        }

    }
}


