const user = () => {}

//model -> repository

user.register = async (client, { username, password, mail }) => {
    return new Promise((resolve, reject) => {
        client.query(
            `INSERT INTO songee_schema.users (username, password, mail) VALUES ($1, $2, $3) RETURNING id`,
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

user.setupProfile = async (client, { id }) => {
    return new Promise((resolve, reject) => {
        client.query(`INSERT INTO songee_schema.user_profiles (user_id) VALUES ($1)`, [id], (err, res) =>
            err ? reject(err) : resolve(res.rows[0])
        )
    })
}

user.getUserData = async (client, { username }) => {
    return new Promise((resolve, reject) => {
        client.query(
            `SELECT * FROM songee_schema.users INNER JOIN songee_schema.user_profiles ON users.id = user_profiles.user_id WHERE username = $1`,
            [username],
            (err, res) => {
                if (err) {
                    console.log(err)
                    reject(err)
                } else if (res.rows[0] == undefined) {
                    reject('USER_NOT_FOUND')
                } else {
                    resolve(res.rows[0])
                }
            }
        )
    })
}

user.updateUserProfile = async (client, { id, firstName, lastName, location }) => {
    return new Promise((resolve, reject) => {
        client.query(
            `UPDATE songee_schema.user_profiles SET first_name = $1, last_name = $2, location = $3 WHERE user_id = $4`,
            [firstName, lastName, location, id],
            (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            }
        )
    })
}

user.validateUser = async (client, { username, password, id }) => {
    return new Promise((resolve, reject) => {
        client.query(
            `SELECT * FROM songee_schema.users WHERE username = $1 AND password = $2 AND id = $3`,
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
