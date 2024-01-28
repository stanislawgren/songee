let pageRepository = require('../repositories/page.repository.js')
let userRepository = require('../repositories/user.repository.js')
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

        return { message: 'OK', res: res }
    }

    async getChatPage(data, xtoken) {
        const encrypt = new Encrypt()
        const decryptedToken = encrypt.decryptData(xtoken).split('&')

        const client = await getClient()
        let res
        try {
            res = await pageRepository.getPairs(client, { user_id: decryptedToken[2] })
        } catch (error) {
            return { error: 'SERVER_ERROR' }
        }

        let pairsIds = []

        res.forEach((pair) => {
            if (pair.user_id_1 == decryptedToken[2]) {
                pairsIds.push(pair.user_id_2)
            } else {
                pairsIds.push(pair.user_id_1)
            }
        })

        let pairsProfiles = []

        for(let i = 0; i < pairsIds.length; i++) {
            let profile
            try {
                profile = await userRepository.getPairProfile(client, { user_id: pairsIds[i] })
            } catch (error) {
                return { error: 'SERVER_ERROR' }
            }
            pairsProfiles.push(profile)
        }

        return { message: 'OK', res: pairsProfiles }
    }
}
