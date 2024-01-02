import ApiCall from '../utils/apiCall.js'
import DevManager from '../../../DevManager.js'
document.getElementById('login-button')

export default class LoginPage {
    document = document
    loginButton = document.getElementById('login-button')
    changeStateButton = document.getElementById('change-state-button')
    state = 'login'
    path = new DevManager().get()
    #token = window.localStorage.getItem('token')

    constructor() {
        if (this.#token) {
            window.location.href = this.path + 'index'
        }

        this.handleHTML()
    }

    handleHTML() {
        this.changeStateButton.addEventListener('click', () => {
            this.changeState()
        })

        this.loginButton.addEventListener('click', () => {
            this.login()
        })
    }

    changeState() {
        if (this.state == 'login') {
            this.document.getElementsByTagName('body')[0].innerHTML = ``
            var form = document.createElement('form')
            form.id = 'myForm'

            // Create login input
            var loginLabel = document.createElement('label')
            loginLabel.for = 'login'
            loginLabel.textContent = 'Login:'
            var loginInput = document.createElement('input')
            loginInput.type = 'text'
            loginInput.id = 'login'
            loginInput.name = 'login'
            form.appendChild(loginLabel)
            form.appendChild(loginInput)
            form.appendChild(document.createElement('br'))

            // Create password input
            var passwordLabel = document.createElement('label')
            passwordLabel.for = 'password'
            passwordLabel.textContent = 'Password:'
            var passwordInput = document.createElement('input')
            passwordInput.type = 'password'
            passwordInput.id = 'password'
            passwordInput.name = 'password'
            form.appendChild(passwordLabel)
            form.appendChild(passwordInput)
            form.appendChild(document.createElement('br'))

            // Create repeat password input
            var repeatPasswordLabel = document.createElement('label')
            repeatPasswordLabel.for = 'repeatPassword'
            repeatPasswordLabel.textContent = 'Repeat Password:'
            var repeatPasswordInput = document.createElement('input')
            repeatPasswordInput.type = 'password'
            repeatPasswordInput.id = 'repeatPassword'
            repeatPasswordInput.name = 'repeatPassword'
            form.appendChild(repeatPasswordLabel)
            form.appendChild(repeatPasswordInput)
            form.appendChild(document.createElement('br'))

            // Create mail input
            var mailLabel = document.createElement('label')
            mailLabel.for = 'mail'
            mailLabel.textContent = 'Email:'
            var mailInput = document.createElement('input')
            mailInput.type = 'email'
            mailInput.id = 'mail'
            mailInput.name = 'mail'
            form.appendChild(mailLabel)
            form.appendChild(mailInput)
            form.appendChild(document.createElement('br'))

            // Create submit button
            var submitButton = document.createElement('input')
            submitButton.type = 'button'
            submitButton.value = 'Submit'
            submitButton.onclick = this.register
            form.appendChild(submitButton)

            var changeButton = document.createElement('button')
            changeButton.innerText = 'Already have an account? Click here!'
            changeButton.type = 'button'
            changeButton.onclick = this.changeState
            form.appendChild(changeButton)

            // Append form to the body
            document.body.appendChild(form)
        } else if (this.state == 'register') {
            this.document.getElementsByTagName('body')[0].innerHTML = ``
            var form = document.createElement('form')
            form.id = 'myForm'

            // Create login input
            var loginLabel = document.createElement('label')
            loginLabel.for = 'login'
            loginLabel.textContent = 'Login:'
            var loginInput = document.createElement('input')
            loginInput.type = 'text'
            loginInput.id = 'login'
            loginInput.name = 'login'
            form.appendChild(loginLabel)
            form.appendChild(loginInput)
            form.appendChild(document.createElement('br'))

            // Create password input
            var passwordLabel = document.createElement('label')
            passwordLabel.for = 'password'
            passwordLabel.textContent = 'Password:'
            var passwordInput = document.createElement('input')
            passwordInput.type = 'password'
            passwordInput.id = 'password'
            passwordInput.name = 'password'
            form.appendChild(passwordLabel)
            form.appendChild(passwordInput)
            form.appendChild(document.createElement('br'))

            var submitButton = document.createElement('input')
            submitButton.type = 'button'
            submitButton.value = 'Submit'
            submitButton.onclick = this.login()
            form.appendChild(submitButton)

            var changeButton = document.createElement('button')
            changeButton.type = 'button'
            changeButton.innerText = "Don't have an account? Click here!"
            changeButton.onclick = this.changeState
            form.appendChild(changeButton)
        }
    }

    async register() {
        const login = document.getElementById('login').value
        const password = document.getElementById('password').value
        const repeatPassword = document.getElementById('repeatPassword').value
        const mail = document.getElementById('mail').value

        if (password != repeatPassword) {
            throw new Error('Passwords do not match')
        }

        new ApiCall('/user/register', 'POST', { username: login, password: password, mail: mail })
            .call()
            .then((response) => response.json())
            .then((data) => (res = data))
            .catch((error) => console.error(error))
    }

    async login() {
        const login = document.getElementById('username').value
        const password = document.getElementById('password').value

        let res

        await new ApiCall('/user/login', 'POST', { username: login, password: password })
            .call()
            .then((response) => response.json())
            .then((data) => (res = data))
            .catch((error) => console.error(error))

        if (res.error) {
            throw new Error(res.error)
        }

        window.localStorage.setItem('token', res.token)

        window.location.href = this.path + 'index.html'
    }
}
