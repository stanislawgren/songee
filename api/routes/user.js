const userController = require('../controllers/user.controller')

module.exports = {
    'getData': userController.getUser,
    'login': userController.login,
}
