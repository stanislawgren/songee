const UserController = require('../controllers/user.controller')
const Encrypt = require('../utils/Encryption')

class Authorization {
    #token = ''
    #authorized = false
    #res
    encryption

    constructor(token, res) {
        this.#token = token.split(' ')[1]
        this.encryption = new Encrypt()
        this.#res = res
    }

    async authorize() {
        let decryptedToken
        try {
            decryptedToken = this.encryption.decryptData(this.#token)
        } catch (error) {
            return false
        }

        let tokenArr = decryptedToken.split('&')

        let authorized = await new UserController().validateUser(
            JSON.stringify({ username: tokenArr[0], password: tokenArr[1], id: tokenArr[2] })
        )

        return authorized.message == 'OK'
    }
}

module.exports = Authorization
