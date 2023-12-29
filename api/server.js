const http = require('http')
const router = require('./handlers/routerHandler')
const Authorization = require('./handlers/authorize.js')
class Server {
    #server = this.#handleServer()
    #authorized = false

    constructor() {
        this.#server.listen(8080, () => {
            console.log('Server listening on port 8080')
        })
    }

    #handleServer() {
        const server = http.createServer((request, response) => {
            response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
            response.setHeader('Access-Control-Allow-Credentials', 'true')
            response.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
            response.setHeader('Access-Control-Allow-Headers', '*')
            response.setHeader('Access-Control-Request-Headers', '*')
            console.log(request.url)
            if (!request.headers['authorization'] && request.method == 'OPTIONS') {
                response.writeHead(200)
                response.end('ok')
                return
            }
            try {
                new Authorization(request.headers['authorization'], response)
            } catch (error) {
                response.writeHead(200)
                response.end('UNAUTHORIZED')
                return
            }

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
                    router(request, response, 'xd', body)
                })
        })

        return server
    }
}

const server = new Server()

module.exports = server
