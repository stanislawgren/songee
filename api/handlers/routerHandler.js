let userRoute = require('../routes/user.js')

const endpoints = {
    user: userRoute,
}

const router = ({ url, method }, response, token, body = {}) => {
    let endpointArr = url.split('/')

    if (endpointArr[1] != 'api') {
        getHandler(response, url)
    }

    response.setHeader('Content-Type', 'application/json')

    if (endpointArr.length == 4) {
        endpoints[endpointArr[2]][endpointArr[3]]()
    } 

    response.statusCode = 200
    response.end(JSON.stringify({ message: url }))
}

module.exports = router
