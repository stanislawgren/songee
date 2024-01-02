const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })
const crypto = require('crypto')

module.exports = class Encrypt {
    #secretKey
    #method

    constructor() {
        this.#secretKey = process.env.SECRET_KEY
        this.#method = process.env.ENCRYPTION_METHOD
        const ivLength = 16
        // const paddedIv = Buffer.alloc(ivLength)
        // const providedIv = Buffer.from(process.env.SECRET_IV, 'hex')
        // providedIv.copy(paddedIv)

        // this.#secretIv = paddedIv
    }

    encryptData(data) {
        var mykey = crypto.createCipher(this.#method, this.#secretKey)
        var mystr = mykey.update(data, 'utf8', 'hex')
        mystr += mykey.final('hex')

        return mystr
    }

    decryptData(encryptedData) {
        var mykey = crypto.createDecipher(this.#method, this.#secretKey)
        var mystr = mykey.update(encryptedData, 'hex', 'utf8')
        mystr += mykey.final('utf8')

        return mystr
    }
}
