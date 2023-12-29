const http = require('http')
const getHandler = require('./handlers/getHandler')
const endpointHandler = require('./handlers/endpointHandler')
const router = require('./handlers/routerHandler')

const server = http.createServer((request, response) => {
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
            console.log(request.headers)
            try {
                router(request, response, 'xd', body)
            } catch (error) {
                switch (method) {
                    case 'GET':
                        getHandler(response, url)
                    case 'POST':
                        if (url === '/login') {
                            console.log()
                            response.writeHead(200, { 'Content-Type': 'application/json' })
                            response.end(JSON.stringify({ message: 'Login successful' }))
                        }
                        break
                    default:
                        response.writeHead(404, { 'Content-Type': 'application/json' })
                        response.end(JSON.stringify({ error: 'Endpoint not found' }))
                }
            }
        })
})

server.listen(8080, () => {
    console.log('Server listening on port 8080')
})
