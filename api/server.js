const http = require('http')
const router = require('./handlers/routerHandler')
const Authorization = require('./handlers/authorize.js')
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')
class Server {
    #server = this.#handleServer()
    #authorized = false

    constructor() {
        this.#server.listen(8080, () => {
            console.log('Server listening on port 8080')
        })
    }

    #handleServer() {
        const server = http.createServer(async (request, response) => {
            response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
            response.setHeader('Access-Control-Allow-Credentials', 'true')
            response.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
            response.setHeader('Access-Control-Allow-Headers', '*')
            response.setHeader('Access-Control-Request-Headers', '*')
            response.setHeader('Content-Type', 'application/json')
            if (!request.headers['authorization'] && request.method == 'OPTIONS') {
                response.writeHead(200)
                response.end('ok')
                return
            }
            let result

            let body = ''

            if (request.url != '/api/user/login' && request.url != '/api/user/register') {
                const authorized = await new Authorization(request.headers['authorization'], response).authorize()
                if (!authorized) {
                    response.writeHead(401)
                    response.end(JSON.stringify({ message: 'UNAUTHORIZED' }))
                    return
                }
            }

            if (request.url.includes('/api/file')) {
                const form = new formidable.IncomingForm()
                let newPath
                form.parse(request, function (err, fields, files) {
                    console.log()
                    let oldPath = files.file[0].filepath

                    newPath = path.join(__dirname, 'avatars', fields.username[0] + "_avatar.png" )
                    let rawData = fs.readFileSync(oldPath)

                    fs.rename(oldPath, newPath, function (err) {
                        if (err) console.log(err)
                    })
                })

            }

            request
                .on('error', (err) => {
                    response.writeHead(500)
                    response.end(`Server error: ${err}`)
                })
                .on('data', (chunk) => {
                    if(request.url.includes('/api/file')) body = ''
                    else body += chunk
                })
                .on('end', () => {
                    new router(request, response, request.headers['authorization'].split(' ')[1], body)
                })
        })

        return server
    }
}

const server = new Server()

module.exports = server
