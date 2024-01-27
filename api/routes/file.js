const FileController = require('../controllers/file.controller')

module.exports = {
    'avatarUpload': new FileController().uploadAvatar,
}
