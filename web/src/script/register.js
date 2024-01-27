import DevManager from '../../DevManager.js'
import InputHandler from '../utils/InputHandler.js'
import AlertBox from '../utils/AlertBox.js'
import UserService from '../services/userService.js'

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
        this.userService = new UserService()

        this.handleHTML()
    }

    handleHTML() {
        this.registerButton.addEventListener('click', () => {
            this.register()
        })

        window.addEventListener('keydown', (e) => {
            if (e.key == 'Enter') {
                this.register()
            }
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
            new AlertBox(error)
            return
        }

        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        const repeatPassword = document.getElementById('repeat-password').value
        const mail = document.getElementById('mail').value

        if (password != repeatPassword) {
            new AlertBox('Passwords do not match')
            return
        }

        let res = await this.userService.register(username, password, mail)

        if (res.error) {
            new AlertBox(res.error)
            return
        }

        if (res.message == 'OK') {
            window.location.href = this.path + 'login.html'
        }
    }
}
