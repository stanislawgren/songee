import ApiCall from '../utils/apiCall.js'
import DevManager from '../../DevManager.js'
import InputHandler from '../utils/InputHandler.js'
import ErrorHandler from '../utils/ErrorHandler.js'

export default class RegisterPage {
    document = document
    registerButton = document.getElementById('register-button')
    path = new DevManager().get()
    #token = window.localStorage.getItem('token')
    inputHandler = new InputHandler()

    constructor() {
        if (this.#token) {
            window.location.href = this.path + 'index.html'
        }

        this.handleHTML()
    }

    handleHTML() {
        this.registerButton.addEventListener('click', () => {
            this.register()
        })
    }

    async register() {
        try {
            this.inputHandler.handleLogin(document.getElementById('username'))
            this.inputHandler.handlePasswordRegister(
                document.getElementById('password'),
                document.getElementById('repeat-password')
            )
            this.inputHandler.handleMail(document.getElementById('mail'))
        } catch (error) {
            new ErrorHandler(error)
            return
        }

        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        const repeatPassword = document.getElementById('repeat-password').value
        const mail = document.getElementById('mail').value

        if (password != repeatPassword) {
            new ErrorHandler('Passwords do not match')
            return
        }

        let res

        await new ApiCall('/user/register', 'POST', { username: username, password: password, mail: mail })
            .call()
            .then((response) => response.json())
            .then((data) => (res = data))
            .catch((error) => console.error(error))

        if (res.error) {
            new ErrorHandler(res.error)
            return
        }

        if(res.message == 'OK') {
            window.location.href = this.path + 'login.html'
        }
    }
}
