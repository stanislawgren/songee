let fileRepository = require('../repositories/file.repository.js')
const file = require('../routes/file')
const { getClient } = require('../utils/DatabasePool.js')
const Encrypt = require('../utils/Encryption.js')
const path = require('path')

module.exports = class FileController {
    async uploadAvatar(data, xtoken) {
        const encrypt = new Encrypt()

        const decryptedToken = encrypt.decryptData(xtoken).split('&')
        const client = await getClient()

        console.log()

        console.log(decryptedToken)

        let res
        try {
            res = await fileRepository.updateUserAvatar(client, {
                url: decryptedToken[0] + '_avatar.png',
                id: decryptedToken[2],
            })
        } catch (error) {
            return { error: 'SERVER_ERROR' }
        }

        return { message: 'OK' }
    }
}
