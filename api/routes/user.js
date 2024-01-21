const UserController = require('../controllers/user.controller')

module.exports = {
    'getData': new UserController().getUser,
    'login': new UserController().login,
    'register': new UserController().register,
}
