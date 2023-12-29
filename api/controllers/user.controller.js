let userModel = require('../models/user.model')

exports.getUser = async (userId) => {
    console.log('controller.getUser')
    userModel.getUserData(userId)
}
