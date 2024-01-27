const file = () => {}

file.updateUserAvatar = async (client, { url, id }) => {
    return new Promise((resolve, reject) => {
        client.query(`UPDATE songee_schema.user_profiles SET avatar = $1 WHERE user_id = $2`, [url, id], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

module.exports = file
