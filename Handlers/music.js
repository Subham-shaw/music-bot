const { Manager } = require('erela.js')
const { EmbedBuilder } = require('discord.js')
const fetch = require('isomorphic-unfetch')
const { getPreview } = require('spotify-url-info')(fetch)

module.exports = async (client) => {
    client.manager = new Manager({
        defaultSearchPlatform: "ytsearch", volumeDecrementer: 0.75, position_update_interval: 100,
        handleError: false, handleStuck: false,
        nodes: [{
            identifier: `My Lavalink`, host: `lavalink.made-by-air.com`, port: 2000, password: 'youshallnotpass',
            version: `v3`, retryAmount: 20, secure: false,
        }],
        validUnresolvedUris: ["spotify.com", "twitch.com", "twitch.tv", "vimeo.com", "bandcamp.com"],
        shards: client.ws.totalShards || 1, clientName: client.user?.username,
        clientId: client.user?.id || client.id,
        send(id, payload) {
            const guild = client.guilds.cache.get(id);
            if (!guild) return;
            guild.shard.send(payload);
        },

    })

    // init the manager
    client.on("ready", () => {
        client.manager.init(client.user.id, {
            shards: client.ws.totalShards,
            clientName: client.user.username,
            clientId: client.user.id,
        });
    })

    // send voicestate updates
    client.on("raw", (data) => {
        switch (data.t) {
            case "VOICE_SERVER_UPDATE":
            case "VOICE_STATE_UPDATE":
                client.manager.updateVoiceState(data.d)
                break;
        }
    });
    let msg;
    let format = client.fnc.format
    client.manager.on("trackStart", async (player, track) => {
        try {
            let guildID = await player.guild
            let guild = await client.guilds.fetch(guildID)
            
            let channel = await player.textChannel
            channel = await guild.channels.cache.get(channel)
            let img, url = await `https://open.spotify.com/track/${player.queue.current.identifier}`;
  

            const interaction = await player.get('interaction')
            let embed = new EmbedBuilder().setColor('LuminousVividPink').setTimestamp().setFields(
                {
                    name: `${client.em.playing} Now playing: _${track.title}_`,
                    value: `> ${client.em.requester} **Requester: **${track.requester}\n> ${client.em.duration} **Duration: **\`${format(track.duration)}\`\n> ${client.em.artist} **Artist: **\`${track.author}\`\n> ${client.em.link} **Link: **[Click Me](${track.uri})\n> ${client.em.queueList} **Queue Length: **\`${player.queue.totalSize}\``,
                },
            ).setFooter({text: `Lavalink Ping: ${player.wsPing}ms`, iconURL: `https://cdn.discordapp.com/emojis/1114082982400106556.webp`})
            // .setThumbnail(track.thumbnail)
            await getPreview(url).then(data => embed.setThumbnail(data.image)).catch((e) => { null })
  
            msg = await channel.send({ embeds: [ embed ] })
        } catch (err) {
            console.error(err)
        }
    })

    client.manager
    .on("nodeCreate", (node) => { console.log(`Created the Node: ${node.options.identifier} on host: ${node.options.host}`); })
    .on("nodeConnect", (node) => {
        console.table({
        'Identifier': `${node.options.identifier}`,
        'host': `${node.options.host}`,
        'port': `${node.options.port}`,
        'Secure': `${node.options.secure}`,
        'version': `${node.options.version}`,
    })
    })
    .on("nodeReconnect", (node) => { console.log(`The Node: ${node.options.identifier} on host: ${node.options.host} is now attempting a reconnect`); })
    .on("nodeDisconnect", (node) => { console.error(`Connection of the Node: ${node.options.identifier} on host: ${node.options.host}, disconnected`); })
    .on("nodeError", (node, error) => { console.error(`Node: ${node.options.identifier} on host: ${node.options.host} errored:`, error); })
    .on("playerDestroy", () => { msg.edit({content: `${client.em.tick} **Finished Playing**!`}) })
    .on("playerDisconnect", (player) => {  player.destroy(); })
    .on("trackEnd", () => { msg.edit({content: `${client.em.tick} **Finished Playing**!`}) })
    .on("trackStuck", (player) => { console.log(`Track Stucked: ${player.guild}`); })
    .on("trackError", (player) => { console.log(`Track Errored: ${player.guild}`); player.stop(); })
    .on("playerMove", (player, newChannel) => {
        if(player.voiceChannel === newChannel) return;
        // all of the code should not be necessary, but sometimes it fixes a bug
        player.voiceChannel = newChannel; // overwride the voiceChannel with the newChannel
        if (player.paused) return; // if it's paused keep it 
        setTimeout(() => {
            player.pause(true); // else pause and unpause to continue playing
            setTimeout(() => player.pause(false), 150);
        }, 150);
    })
    .on('queueEnd', async (player, track) => {
        let set = await client.db.get(`${player.guild}`, 'music.afk')
        let channel = await player.get('textChannel')
        if (!set == true) {
            await player.destroy()
            channel.send({embeds: [new EmbedBuilder().setColor('LuminousVividPink').setTitle(`${client.em.queueEnded} Queue Ended!`).setDescription(`Left The Voice Channel.\nTo Disable this, Use \`/player afk\``)]})

        }
    })
}

