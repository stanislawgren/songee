let userRoute = require('../routes/user.js')
const getHandler = require('./getHandler')

const endpoints = {
    user: userRoute,
}

const router = ({ url, method }, response, token, body = {}) => {}

module.exports = class RouterClass {
    #url
    #method
    response
    token
    body

    constructor({ url, method }, callback, token, body) {
        this.#url = url
        this.#method = method
        this.response = callback
        this.token = token
        this.body = body

        this.handleRoute()
    }

    async handleRoute() {
        let endpointArr = this.#url.split('/')

        this.response.setHeader('Content-Type', 'application/json')

        if (endpointArr[1] != 'api') {
            this.response.statusCode = 500
            this.response.end(JSON.stringify({ message: 'BAD_REQUEST' }))
            return
        }

        let res

        console.log(this.body, endpointArr)
        if (endpointArr.length == 4) {
            console.log(endpoints[endpointArr[2]])
            res = await endpoints[endpointArr[2]][endpointArr[3]](this.body)
        }

        if(res.error) {
            this.response.statusCode = 500
            this.response.end(JSON.stringify(res))
            return
        }

        this.response.statusCode = 200
        this.response.end(JSON.stringify(res))
    }
}
