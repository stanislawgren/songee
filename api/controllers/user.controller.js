let userRepository = require('../repositories/user.repository.js')
let pageRepository = require('../repositories/page.repository.js')
const { getClient } = require('../utils/DatabasePool.js')
const Encrypt = require('../utils/Encryption.js')
module.exports = class UserController {
    async register(data, xtoken) {
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

        try {
            userRepository.setupProfile(client, res)
        } catch (error) {
            return { error: 'SERVER_ERROR' }
        }

        return { message: 'OK' }
    }

    async login(data, xtoken) {
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

        const token = encrypt.encryptData(parsedData.username + '&' + parsedData.password + '&' + userData.user_id)

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

    async getUser(data, token) {
        const client = await getClient()
        const encrypt = new Encrypt()
        const decryptedToken = encrypt.decryptData(token).split('&')

        let res
        try {
            res = await userRepository.getUserData(client, { username: decryptedToken[0] })
        } catch (error) {
            return { error: 'USER_NOT_FOUND' }
        }

        delete res.password
        let genres
        try {
            genres = await userRepository.getUserGenres(client, { id: decryptedToken[2] })
        } catch (error) {
            return { error: 'SERVER_ERROR' }
        }

        res.genres = []

        if (genres.length > 0) {
            genres.forEach((element) => {
                res.genres.push(element.name)
            })
        }

        return { message: 'OK', res: res }
    }

    async updateProfile(data, token) {
        const client = await getClient()
        let parsedData = JSON.parse(data)

        let genres
        try {
            genres = await pageRepository.getGenres(client)
        } catch (error) {
            return { error: 'SERVER_ERROR' }
        }

        let genresToInsert = []

        genres.forEach((element) => {
            if (parsedData.genres.includes(element.name)) {
                genresToInsert.push(element.id)
            }
        })

        try {
            await userRepository.updateUserGenres(client, { id: parsedData.id, genres: genresToInsert })
        } catch (error) {
            return { error: 'SERVER_ERROR' }
        }

        let res
        try {
            res = await userRepository.updateUserProfile(client, parsedData)
        } catch (error) {
            return { error: 'SERVER_ERROR' }
        }

        return { message: 'OK' }
    }

    async getUsersProfiles(data, token) {
        const client = await getClient()

        const encrypt = new Encrypt()
        const decryptedToken = encrypt.decryptData(token).split('&')

        let user

        try {
            user = await userRepository.getUserData(client, { username: decryptedToken[0] })
        } catch (error) {
            return { error: 'SERVER_ERROR' }
        }

        let getLikesRes = []
        let likes = []
        let users = []

        try {
            getLikesRes = await userRepository.getLikes(client, { user_id: decryptedToken[2] })
        } catch (error) {
            return { error: 'SERVER_ERROR' }
        }

        getLikesRes.forEach((element) => {
            likes.push(element.liked_id)
        })

        try {
            users = await userRepository.getUsersProfiles(client, { user_id: user.user_id, gender: user.gender })
        } catch (error) {
            return { error: 'SERVER_ERROR' }
        }

        let usersToDelete = []

        users.forEach((user, index) => {
            if (likes.includes(user.user_id)) {
                usersToDelete.push(user)
            }
        })

        usersToDelete.forEach((user) => {
            const arrIndex = users.indexOf(user)
            users.splice(arrIndex, 1)
        })
        return { message: 'OK', res: users }
    }

    async likeUser(data, token) {
        const client = await getClient()

        let parsedData = JSON.parse(data)

        const encrypt = new Encrypt()
        const decryptedToken = encrypt.decryptData(token).split('&')

        let likeCheck

        try {
            likeCheck = await userRepository.checkForLike(client, {
                user_id: parsedData.userId,
                liked_id: decryptedToken[2],
            })
        } catch (error) {
            return { error: 'SERVER_ERROR' }
        }

        let res

        try {
            res = await userRepository.addLike(client, { user_id: decryptedToken[2], liked_id: parsedData.userId })
        } catch (error) {
            return { error: 'SERVER_ERROR' }
        }

        let addLikeRes

        if (likeCheck.value == 1) {
            try {
                addLikeRes = await userRepository.addPair(client, {
                    user_id: decryptedToken[2],
                    user_id_2: parsedData.userId,
                })
            } catch (error) {
                return { error: 'SERVER_ERROR' }
            }
            return { message: 'PAIR_DETECTED' }
        }

        return { message: 'OK' }
    }

    async dislikeUser(data, token) {
        const client = await getClient()

        let parsedData = JSON.parse(data)

        const encrypt = new Encrypt()
        const decryptedToken = encrypt.decryptData(token).split('&')

        try {
            await userRepository.addDislike(client, { user_id: decryptedToken[2], user_id_2: parsedData.userId })
        } catch (error) {
            return { error: 'SERVER_ERROR' }
        }

        return { message: 'OK' }
    }
}
