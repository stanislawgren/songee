const { Pool, Client } = require('pg')
const poolCredentials = require('../db.json')
const endpointHandler = ({ url, method }, response, body) => {
    // Improve url handling
    const sliceUrl = (url) => {
        console.log(url)
        let newUrl = url
        const indexOfQuery = newUrl.indexOf('?')
        if (indexOfQuery !== -1) {
            newUrl = newUrl.slice(0, indexOfQuery)
        }
        const indexOfPath = newUrl.slice(1).indexOf('/')
        if (indexOfPath !== -1) {
            newUrl = newUrl.slice(0, indexOfPath + 1)
        }
        return newUrl
    }

    const slicedUrl = sliceUrl(url)
    const query = require(`../queries/${slicedUrl}`)[method]

    const returnFirst = ['POST', 'PUT'].includes(method)
    // Add schema
    handleSendEndpoint({
        response,
        ...query,
        body,
        returnFirst,
    })
}
// Handle send endpoint
const handleSendEndpoint = ({ response, query, values, body, returnFirst }) => {
    response.setHeader('Content-Type', 'application/json')
    response.on('error', (error) => handleSendError(response, error))
    const parsedBody = body ? JSON.parse(body) : {}
    // Validate parsedBody
    const queryValues = values?.map((value) => parsedBody?.[value] || null)
    const pool = new Pool(poolCredentials)
    pool.query(query, queryValues, (err, res) => {
        if (err) {
            handleSendError(response, err.toString())
        } else {
            response.statusCode = 200
            response.end(JSON.stringify(returnFirst ? res.rows[0] : res.rows))
        }
        pool.end()
    })
}
// Handle send error
const handleSendError = (response, error) => {
    response.statusCode = 500
    response.end(JSON.stringify({ error }))
}
module.exports = endpointHandler
