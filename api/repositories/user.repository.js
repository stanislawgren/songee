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

user.updateUserProfile = async (
    client,
    {
        id,
        firstName,
        lastName,
        location,
        description,
        age,
        favouriteSongArtist,
        favouriteSongTitle,
        favouriteArtist,
        gender,
    }
) => {
    return new Promise((resolve, reject) => {
        client.query(
            `UPDATE songee_schema.user_profiles SET first_name = $1, last_name = $2, location = $3, description = $4, age = $5, favourite_song_artist = $6, favourite_song_title = $7, favourite_artist = $8, gender = $9 WHERE user_id = $10`,
            [
                firstName,
                lastName,
                location,
                description,
                age,
                favouriteSongArtist,
                favouriteSongTitle,
                favouriteArtist,
                gender,
                id,
            ],
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

user.getUserGenres = async (client, { id }) => {
    return new Promise((resolve, reject) => {
        client.query(
            `SELECT songee.songee_schema.genres.name FROM songee.songee_schema.users_genres INNER JOIN songee.songee_schema.genres ON users_genres.genres_id = genres.id WHERE user_id = $1`,
            [id],
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

user.updateUserGenres = async (client, { id, genres }) => {
    return new Promise((resolve, reject) => {
        client.query(`DELETE FROM songee_schema.users_genres WHERE user_id = $1`, [id], (err, res) => {
            if (err) {
                reject(err)
            } else {
                genres.forEach((genre) => {
                    client.query(
                        `INSERT INTO songee_schema.users_genres (user_id, genres_id) VALUES ($1, $2)`,
                        [id, genre],
                        (err, res) => {
                            if (err) {
                                reject(err)
                            }
                        }
                    )
                })
                resolve(res)
            }
        })
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

user.getUsersProfiles = async (client, { user_id, gender }) => {
    return new Promise((resolve, reject) => {
        client.query(
            `SELECT songee.songee_schema.user_profiles.user_id,
                    songee.songee_schema.user_profiles.description,
                    songee.songee_schema.user_profiles.avatar,
                    songee.songee_schema.user_profiles.first_name,
                    songee.songee_schema.user_profiles.last_name,
                    songee.songee_schema.user_profiles.location,
                    songee.songee_schema.user_profiles.age,
                    STRING_AGG(songee.songee_schema.genres.name, ', ') AS favorite_genres
            FROM songee.songee_schema.user_profiles
            JOIN songee.songee_schema.users ON user_profiles.user_id = users.id
            JOIN songee.songee_schema.users_genres ON user_profiles.user_id = users_genres.user_id
            JOIN songee.songee_schema.genres ON users_genres.genres_id = genres.id
            WHERE users.id <> $1 AND user_profiles.gender <> $2
            group by user_profiles.user_id,
                    songee.songee_schema.user_profiles.description,
                    songee.songee_schema.user_profiles.location,
                    songee.songee_schema.user_profiles.last_name,
                    songee.songee_schema.user_profiles.first_name,
                    songee.songee_schema.user_profiles.avatar, 
                    songee.songee_schema.user_profiles.age`,
            [user_id, gender],
            (err, res) => {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    resolve(res.rows)
                }
            }
        )
    })
}

user.checkForLike = async (client, { user_id, liked_id }) => {
    return new Promise((resolve, reject) => {
        client.query(
            `SELECT * FROM songee.songee_schema.likes WHERE user_id = $1 AND liked_id = $2`,
            [user_id, liked_id],
            (err, res) => {
                if (err) {
                    reject(err)
                } else if (res.rows[0] == undefined) {
                    resolve({ msg: 'NOT_FOUND' })
                } else {
                    resolve(res.rows[0])
                }
            }
        )
    })
}

user.addLike = async (client, { user_id, liked_id }) => {
    return new Promise((resolve, reject) => {
        client.query(
            `INSERT INTO songee.songee_schema.likes (user_id, liked_id, value) VALUES ($1, $2, 1)`,
            [user_id, liked_id],
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

user.getLikes = async (client, { user_id }) => {
    return new Promise((resolve, reject) => {
        client.query(`SELECT * FROM songee.songee_schema.likes WHERE user_id = $1`, [user_id], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res.rows)
            }
        })
    })
}

user.addPair = async (client, { user_id, user_id_2 }) => {
    return new Promise((resolve, reject) => {
        client.query(
            `INSERT INTO songee.songee_schema.pairs (user_id_1, user_id_2) VALUES ($1, $2)`,
            [user_id, user_id_2],
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

user.addDislike = async (client, { user_id, user_id_2 }) => {
    return new Promise((resolve, reject) => {
        client.query(
            `INSERT INTO songee.songee_schema.likes (user_id, liked_id, value) VALUES ($1, $2, 0)`,
            [user_id, user_id_2],
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

user.getPairProfile = async (client, { user_id }) => {
    return new Promise((resolve, reject) => {
        client.query(`SELECT * FROM songee.songee_schema.user_profiles WHERE user_id = $1`, [user_id], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res.rows)
            }
        })
    })
}

module.exports = user
