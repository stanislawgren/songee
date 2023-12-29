let userRoute = require('../routes/user.js')
const getHandler = require('./getHandler')

const endpoints = {
    user: userRoute,
}

const router = ({ url, method }, response, token, body = {}) => {
    
    let endpointArr = url.split('/')

    if (endpointArr[1] != 'api') {
        //getHandler(response, url)
        return
    }

    response.setHeader('Content-Type', 'application/json')

    if (endpointArr.length == 4) {
        console.log(endpoints[endpointArr[2]])
        endpoints[endpointArr[2]][endpointArr[3]](body)
    }

    response.statusCode = 200
    response.end(JSON.stringify({ message: url }))
}

module.exports = router

class RouterClass {
    #endpoints = endpoints
    #req
    #callback
    #token
    #body

    constructor(req, callback, token, body) {
        this.#req = { url: req.url, method: req.method }
        this.#callback = callback
        this.#token = token
        this.#body = body
    }

    #urlHandler() {}

    get(url, callback) {}

    post(url, callback) {}
}
