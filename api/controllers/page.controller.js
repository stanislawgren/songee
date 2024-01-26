let pageRepository = require('../repositories/page.repository.js')
const file = require('../routes/file')
const { getClient } = require('../utils/DatabasePool.js')
const Encrypt = require('../utils/Encryption.js')
const path = require('path')

module.exports = class PageController {
    async getProfilePage(data, xtoken) {
        const client = await getClient()

        let res

        try {
            res = await pageRepository.getGenres(client)
        } catch (error) {
            return { error: 'SERVER_ERROR' }
        }

        console.log(res)

        return { message: 'OK', res: res }
    }
}
