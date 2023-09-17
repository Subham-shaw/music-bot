module.exports = async (client) => {
    const Enmap = require("enmap");
    client.db = new Enmap({
        name: `db`,
        autoFetch: true,
        fetchAll: false,
    })
}