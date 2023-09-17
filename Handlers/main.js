const { readdirSync } = require('fs')

module.exports = async client => {
    //Events
    readdirSync(`${process.cwd()}/events/`).filter(file => file.endsWith(".js")).forEach(file => {
        let pull = require(`${process.cwd()}/events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, pull.bind(null, client));
    })

    //Commands
    const slashCommandArray = [];
    readdirSync(`${process.cwd()}/commands/`).forEach(directory => {
        readdirSync(`${process.cwd()}/commands/${directory}/`).filter(file => file.endsWith(".js")).forEach(file => {
            let pull = require(`${process.cwd()}/commands/${directory}/${file}`);
            client.commands.set(pull.name, pull)
            slashCommandArray.push(pull)
        })
    })

    client.on('ready', async () => {
        if (client.deploySlash.enabled && client.deploySlash.guild) {
            let guild = await client.guilds.fetch(client.deploySlash.guild)
            client.application.commands.set(slashCommandArray, [`${guild.id}`]);
        } else {
            client.application.commands.set(slashCommandArray);
        }

    })

    //Errors
    process.on('unhandleRejection', reason => { console.log('unhandleRejection', reason) })
    process.on('unhandleExcetion', err => { console.log('unhandleExcetion', err) })
    process.on('unhandleExcetionMoniter', err => { console.log('unhandleExcetionMoniter') })
    client.on('shardError', error => { console.error('A websocket connection encountered an error:', error); });

}