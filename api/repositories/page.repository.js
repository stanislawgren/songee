const page = () => {}

page.getGenres = async (client) => {
    return new Promise((resolve, reject) => {
        client.query(`SELECT * FROM songee_schema.genres`, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res.rows)
            }
        })
    })
}

page.getPairs = async (client, { user_id }) => {
    return new Promise((resolve, reject) => {
        client.query(
            `SELECT * FROM songee_schema.pairs WHERE user_id_1 = $1 OR user_id_2 = $1`,
            [user_id],
            (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res.rows)
                }
            }
        )
    })
}

module.exports = page
