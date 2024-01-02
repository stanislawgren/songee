const user = () => {}

user.getUserData = (userId) => {}

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

user.getUserData = async (client, { username }) => {
    return new Promise((resolve, reject) => {
        client.query(`SELECT * FROM songee.users WHERE username = $1`, [username], (err, res) => {
            if (err) {
                reject(err)
            } else if (res.rows[0] == undefined) {
                reject({ error: 'USER_NOT_FOUND' })
            } else {
                resolve(res.rows[0])
            }
        })
    })
}

user.validateUser = async (client, { username, password, id }) => {
    return new Promise((resolve, reject) => {
        client.query(
            `SELECT * FROM songee.users WHERE username = $1 AND password = $2 AND id = $3`,
            [username, password, id],
            (err, res) => {
                if (err) {
                    reject(err)
                } else if (res.rows[0] == undefined) {
                    reject({ error: 'USER_NOT_FOUND' })
                } else {
                    resolve(res.rows[0])
                }
            }
        )
    })
}

module.exports = user
