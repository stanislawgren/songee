let userModel = require('../models/user.model')
const { getClient } = require('../utils/DatabasePool.js')
const Encrypt = require('../utils/Encryption.js')
module.exports = class UserController {
    async register(data) {
        let parsedData = JSON.parse(data)
        const client = await getClient()
        const encrypt = new Encrypt()
        console.log(parsedData)

        let passwd = encrypt.encryptData(parsedData.password)

        parsedData.password = passwd
        try {
            let res = await userModel.register(client, parsedData)
        } catch (err) {
            return { error: 'SERVER_ERROR' }
        }

        return { message: 'OK' }
    }

    async login(data) {
        let parsedData = JSON.parse(data)
        const client = await getClient()
        const encrypt = new Encrypt()
        let userData = await userModel.getUserData(client, parsedData)

        const encryptedPassword = encrypt.decryptData(userData.password)

        if(encryptedPassword != parsedData.password) {
            return { status: 'ERROR', message: 'WRONG_PASSWORD' }
        }

        return { message: 'OK', token: 'my-token' }
    }

    async getUser(data) {
        console.log('controller.getUser')
        userModel.getUserData(JSON.parse(data))
    }
}
