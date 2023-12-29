import ApiCall from "../utils/apiCall.js"

document.getElementById('login-button').addEventListener('click', () => {
    new ApiCall('/user/login', 'POST', {username:"user1", password:"pass1"}).call().then(() => {
        console.log('login')
    })
})
