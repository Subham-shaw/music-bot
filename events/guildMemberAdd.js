module.exports = async (client, member) => {
    autoroleuser()
    autorolebot()

    async function autoroleuser() {
        let guild = await member.guild.id
        let set = await client.db.get(`${guild}`, 'autoroleuser.enabled')
        if (set == true && !member.user.bot) {
            let role = await client.db.get(`${guild}`, 'autoroleuser.role')
            member.roles.add(role).catch((e) => {
                console.log(e)
            })
        }
    }

    async function autorolebot() {
        let guild = await member.guild.id
        let set = await client.db.get(`${guild}`, 'autorolebot.enabled')
        if (set == true && member.user.bot) {
            let role = await client.db.get(`${guild}`, 'autoroleuser.role')
            member.roles.add(role).catch((e) => {
                console.log(e)
            })
        }
    }
}