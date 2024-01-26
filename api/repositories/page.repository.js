const page = () => {}

page.getGenres = async (client) => {
    return new Promise((resolve, reject) => {
        client.query(
            `SELECT * FROM songee_schema.genres`,
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
