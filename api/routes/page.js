const PageController = require('../controllers/page.controller')

module.exports = {
    'getProfilePage': new PageController().getProfilePage,
    'getChatPage': new PageController().getChatPage,
}
