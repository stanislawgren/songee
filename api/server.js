const http = require('http')
const fs = require('fs')
const getHandler = require('./handlers/getHandler')

http.createServer((request, response) => {
    const { method, url } = request
    let body = ''
    request
        .on('error', (err) => {
            response.writeHead(500)
            response.end(`Server error: ${err}`)
        })
        .on('data', (chunk) => {
            body += chunk
        })
        .on('end', () => {
            // Handle get request
            getHandler(response, url)
        })
}).listen(8080)

console.log('Server running at http://localhost:8080/')
