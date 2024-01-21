const { Pool, Client } = require('pg')
const db = require('../db.json')

module.exports.getClient = async () => {
    const client = new Client(db)
    await client
        .connect()
        .then(() => {
            console.log('Database connected')
        })
        .catch((err) => {
            console.error(err)
        })
    return client
}