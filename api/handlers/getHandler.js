const fs = require('fs')
const xpath = require('path')

const getHandler = (response, url) => {
    let dotoffset = url.lastIndexOf('.')
    let mimetype =
        dotoffset == -1
            ? 'text/html'
            : {
                  '.html': 'text/html',
                  '.ico': 'image/x-icon',
                  '.jpg': 'image/jpeg',
                  '.png': 'image/png',
                  '.gif': 'image/gif',
                  '.css': 'text/css',
                  '.js': 'text/javascript',
              }[url.substr(dotoffset)]

    let path = `../../web${url}`
    console.log(mimetype == 'text/html')

    if (mimetype == 'text/html') path = `../../web/pages${url}.html`

    console.log(path)

    if (url === '/') {
        path = '../../web/pages/index.html'
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
