const fs = require('fs')

const getHandler = (response, url) => {
    let path = `../web/public${url}`
    console.log(path)
    if (url === '/') {
        path = '../web/public/index.html'
    } else if (!fs.existsSync(path)) {
        path = `${path}.html`
    }

    fs.readFile(path, function (err, html) {
        if (err) {
            response.setHeader('Content-Type', 'application/json')
            response.on('error', (err) => {
                response.writeHead(500)
                response.end(JSON.stringify({ error }))
            })
            response.writeHead(404)
            response.end(JSON.stringify({ error: 'Page not found' }))
        } else {
            response.writeHeader(200, { 'Content-Type': 'text/html' })
            response.end(html)
        }
    })
}

module.exports = getHandler
