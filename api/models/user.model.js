const user = () => {}

user.getUserData = (userId) => {}

user.login = async (client, { username, password }) => {
    return new Promise((resolve, reject) => {
        client.query('SELECT NOW()', (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res.rows[0])
            }
        })
    })
}

user.register = async (client, { username, password, mail }) => {
    return new Promise((resolve, reject) => {
        client.query(
            `INSERT INTO songee.users (username, password, mail) VALUES ($1, $2, $3)`,
            [username, password, mail],
            (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res.rows[0])
                }
            }
        )
    })
}

module.exports = user
