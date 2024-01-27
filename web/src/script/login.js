import DevManager from '../../DevManager.js'
import AlertBox from '../utils/AlertBox.js'
import InputHandler from '../utils/InputHandler.js'
import UserService from '../services/userService.js'

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

        this.userService = new UserService()

        this.handleHTML()
    }

    handleHTML() {
        this.loginButton.addEventListener('click', () => {
            this.login()
        })

        window.addEventListener('keydown', (e) => {
            if (e.key == 'Enter') {
                this.login()
            }
        })
    }

    async login() {
        try {
            this.inputHandler.handleLogin(document.getElementById('username'))
        } catch (error) {
            new AlertBox(error)
            return
        }

        const login = document.getElementById('username').value
        const password = document.getElementById('password').value

        let res = await this.userService.login(login, password)

        if (res.error) {
            new AlertBox(res.error)
            return
        }

        window.localStorage.setItem('token', res.token)

        window.location.href = this.path + 'index.html'
    }
}
