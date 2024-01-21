let userModel = require('../models/user.model')
const { getClient } = require('../utils/DatabasePool.js')
const Encrypt = require('../utils/Encryption.js')
module.exports = class UserController {
    async register(data) {
        console.log(data)
        let parsedData = JSON.parse(data)
        const client = await getClient()
        const encrypt = new Encrypt()

        let passwd = encrypt.encryptData(parsedData.password)
        let res
        parsedData.password = passwd
        try {
            res = await userModel.register(client, parsedData)
        } catch (err) {
            return { error: 'SERVER_ERROR' }
        }

        return { message: 'OK' }
    }

    async login(data) {
        console.log(data)
        let parsedData = JSON.parse(data)
        const client = await getClient()
        const encrypt = new Encrypt()

        let userData
        try {
            userData = await userModel.getUserData(client, parsedData)
        } catch (error) {
            return { error: 'USER_NOT_FOUND' }
        }
        console.log("chuj")
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
            userData = await userModel.validateUser(client, parsedData)
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
