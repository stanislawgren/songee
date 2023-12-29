class Authorization {
    #token = ''
    #authorized = false
    #res

    constructor(token, res) {
        this.#token = token.split(' ')[1]
        this.#authorized = this.#authorize()
        this.#res = res
        if (!this.#authorized) {
            throw new Error('Unauthorized')
        }
    }

    #authorize() {
        if (this.#token) {
            if (this.#token == 'my-token') {
                return true
            }
        } else {
            return false
        }
    }
}

module.exports = Authorization
