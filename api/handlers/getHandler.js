const fs = require('fs')

const getHandler = (response, url) => {
    let path = `../web/public${url}`
    
    //let dotoffset = url.lastIndexOf('.')
    // let mimetype =
            //     dotoffset == -1
            //         ? 'text/plain'
            //         : {
            //               '.html': 'text/html',
            //               '.ico': 'image/x-icon',
            //               '.jpg': 'image/jpeg',
            //               '.png': 'image/png',
            //               '.gif': 'image/gif',
            //               '.css': 'text/css',
            //               '.js': 'text/javascript',
            //           }[request.url.substr(dotoffset)]
            // response.setHeader('Content-type', mimetype)
            // response.end(data)
            // console.log(request.url, mimetype)

    if (url === '/') {
        path = '../web/public/index.html'
    } else if (!fs.existsSync(path)) {
        path = `${path}.html`
    }

    fs.readFile(path, function (err, html) {
        let dotoffset = path.lastIndexOf('.')
        console.log(path)
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
