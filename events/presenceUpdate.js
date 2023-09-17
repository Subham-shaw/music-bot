module.exports = async (client, oldPresence, newPresence) => {
    let guildID = await newPresence.guild.id
    let set = await client.db.get(`${guildID}`, `statusrole.enabled`)
    if (set == true) {
        let Role = await client.db.get(`${guildID}`, `statusrole.role`)
        let term = await client.db.get(`${guildID}`, `statusrole.term`)
        if (guildID == '927111137315663912') {
            const role = newPresence.guild.roles.cache.get(Role.id);
            const member = newPresence.member
            const activities = member.presence.activities[0];
            if (activities && (activities.state == term)) {
                return member.roles.add(role)
            } else {
                if (member.roles.cache.get(role.id)) {
                    member.roles.remove(role)
                }
            }

        }
    }
}