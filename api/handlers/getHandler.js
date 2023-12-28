const fs = require('fs')
const xpath = require('path')

const getHandler = (response, url) => {

    let path = `../../web/public${url}`

    if (url === '/') {
        path = '../../web/public/index.html'
    } else if (!fs.existsSync(path)) {
        path = `${path}`
    }

    console.log('Path of file in parent dir:', xpath.resolve(__dirname, path))

    fs.readFile(xpath.resolve(__dirname, path), function (err, html) {
        if (err) {
            response.setHeader('Content-Type', 'application/json')
            response.on('error', (err) => {
                response.writeHead(500)
                response.end(JSON.stringify({ error }))
            })
            response.writeHead(404)
            response.end(JSON.stringify({ error: 'Page not found' }))
        } else {
            response.writeHead(200, { 'Content-Type': mimetype })
            response.end(html)
        }
    })
}

module.exports = getHandler
