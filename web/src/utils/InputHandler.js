export default class InputHandler {
    constructor() {
        this.document = document
    }

    handleLogin(input) {
        if (input.value.length < 5) {
            throw new Error('Username too short')
        }
    }

    handlePasswordRegister(input, repeatInput) {
        if (input.value != repeatInput.value) {
            throw new Error('Passwords do not match')
        }

        if (input.value.length < 8) {
            throw new Error('Password too short')
        }
    }

    handleMail(input) {
        var regex = /\S+@\S+\.\S+/
        
        if (!regex.test(input.value)) {
            throw new Error('Invalid mail')
        }
    }
}
