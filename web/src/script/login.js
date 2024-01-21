import ApiCall from '../utils/apiCall.js'
import DevManager from '../../DevManager.js'
import ErrorHandler from '../utils/ErrorHandler.js'
import InputHandler from '../utils/InputHandler.js'

export default class LoginPage {
    document = document
    loginButton = document.getElementById('login-button')
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
        this.loginButton.addEventListener('click', () => {
            this.login()
        })
    }

    async login() {
        try {
            this.inputHandler.handleLogin(document.getElementById('username'))
        } catch (error) {
            new ErrorHandler(error)
            return
        }

        const login = document.getElementById('username').value
        const password = document.getElementById('password').value

        let res

        await new ApiCall('/user/login', 'POST', { username: login, password: password })
            .call()
            .then((response) => response.json())
            .then((data) => (res = data))
            .catch((error) => console.error(error))

        if (res.error) {
            new ErrorHandler(res.error)
            return
        }

        window.localStorage.setItem('token', res.token)

        window.location.href = this.path + 'index.html'
    }
}
