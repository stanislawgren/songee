
const pathResolver = require('./pathResolver')

const pathResolver = (url) => {
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
}

export default pathResolver
