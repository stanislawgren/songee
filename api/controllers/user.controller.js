let userModel = require('../models/user.model')

exports.getUser = async (data) => {
    console.log('controller.getUser')
    userModel.getUserData(userId)
}

exports.login = async (data) => {
    userModel.login(JSON.parse(data))
}
