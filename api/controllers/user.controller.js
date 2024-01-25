let userRepository = require('../repositories/user.repository.js')
const { getClient } = require('../utils/DatabasePool.js')
const Encrypt = require('../utils/Encryption.js')
module.exports = class UserController {
    async register(data) {
        
        let parsedData = JSON.parse(data)
        const client = await getClient()

        const encrypt = new Encrypt()

        let passwd = encrypt.encryptData(parsedData.password)
        let res
        parsedData.password = passwd
        try {
            res = await userRepository.register(client, parsedData)
        } catch (err) {
            return { error: 'SERVER_ERROR' }
        }

        return { message: 'OK' }
    }

    async login(data) {
        let parsedData = JSON.parse(data)
        const client = await getClient()

        if (client._connectionError) {
            return { error: 'SERVER_ERROR' }
        }

        const encrypt = new Encrypt()

        let userData
        try {
            userData = await userRepository.getUserData(client, parsedData)
        } catch (error) {
            return { error: 'USER_NOT_FOUND' }
        }

        const encryptedPassword = encrypt.decryptData(userData.password)

        if (encryptedPassword != parsedData.password) {
            return { error: 'WRONG_PASSWORD' }
        }

        const token = encrypt.encryptData(parsedData.username + '&' + parsedData.password + '&' + userData.id)

        return { message: 'OK', token: token }
    }

    async validateUser(data) {
        let parsedData = JSON.parse(data)
        const client = await getClient()
        const encrypt = new Encrypt()
        const encryptedPassword = encrypt.encryptData(parsedData.password)

        parsedData.password = encryptedPassword

        let userData
        try {
            userData = await userRepository.validateUser(client, parsedData)
        } catch (error) {}

        if (userData == undefined) {
            return { error: 'USER_NOT_FOUND' }
        }

        return { message: 'OK' }
    }

    async getUser(data) {
        return { message: 'OK' }
    }
}
