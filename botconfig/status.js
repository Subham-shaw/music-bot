const { ActivityType } = require('discord.js');

const options = [
    {
        text: `/play`,
        type: ActivityType.Listening,
        status: `online`
    }, 
    {
        text: `{membercount} Members`,
        type: ActivityType.Watching,
        status: `online`
    },
    {
        text: `with New Features!`,
        type: ActivityType.Playing,
        status: `online`
    }
]

module.exports = options