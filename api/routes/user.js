let User = require('../controllers/user.controller')

module.exports = {
    'getData': new User().getUser,
    'login': new User().login,
    'register': new User().register,
}
