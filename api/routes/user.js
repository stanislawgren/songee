const UserController = require('../controllers/user.controller')

module.exports = {
    'getData': new UserController().getUser,
    'login': new UserController().login,
    'register': new UserController().register,
    'updateProfile': new UserController().updateProfile,
    'getUsersProfiles': new UserController().getUsersProfiles,
    'likeUser': new UserController().likeUser,
    'dislikeUser': new UserController().dislikeUser,
}
