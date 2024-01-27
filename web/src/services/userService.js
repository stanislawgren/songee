import ApiCall from '../utils/apiCall.js'

export default class UserService {
    async login(login, password) {
        let res

        await new ApiCall('/user/login', 'POST', { username: login, password: password })
            .call()
            .then((response) => response.json())
            .then((data) => (res = data))
            .catch((error) => console.error(error))

        return res
    }

    async register(login, password, mail) {
        let res

        await new ApiCall('/user/register', 'POST', { username: login, password: password, mail: mail })
            .call()
            .then((response) => response.json())
            .then((data) => (res = data))
            .catch((error) => console.error(error))

        return res
    }

    async getUsersProfiles() {
        let res

        await new ApiCall('/user/getUsersProfiles', 'GET')
            .call()
            .then((response) => response.json())
            .then((data) => (res = data))
            .catch((error) => console.error(error))

        return res
    }

    async likeUser(userId) {
        let res

        await new ApiCall('/user/likeUser', 'POST', { userId: userId })
            .call()
            .then((response) => response.json())
            .then((data) => (res = data))
            .catch((error) => console.error(error))

        return res
    }

    async dislikeUser(userId) {
        let res

        await new ApiCall('/user/dislikeUser', 'POST', { userId: userId })
            .call()
            .then((response) => response.json())
            .then((data) => (res = data))
            .catch((error) => console.error(error))

        return res
    }
}
