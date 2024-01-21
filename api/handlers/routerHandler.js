let userRoute = require('../routes/user.js')

const endpoints = {
    user: userRoute,
}

module.exports = class RouterClass {
    #url
    response
    token
    body

    constructor({ url }, callback, token, body) {
        this.#url = url
        this.response = callback
        this.token = token
        this.body = body

        this.handleRoute()
    }

    async handleRoute() {
        const endpointArr = this.#url.split('/')

        if (endpointArr[1] != 'api') {
            this.response.statusCode = 500
            this.response.end(JSON.stringify({ message: 'BAD_REQUEST' }))
            return
        }

        let res

        if (endpointArr.length == 4) {
            res = await endpoints[endpointArr[2]][endpointArr[3]](this.body)
        }

        if (res.error || res == undefined) {
            this.response.statusCode = 500
            this.response.end(JSON.stringify(res))
            return
        }

        this.response.statusCode = 200
        this.response.end(JSON.stringify(res))
    }
}
