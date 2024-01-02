export default class ApiCall {
    url
    method
    body
    props
    token

    constructor(url, method, body) {
        this.url = 'http://localhost:8080/api' + url
        this.method = method
        this.body = body
        this.props = []
        this.token = window.localStorage.getItem('token')
    }

    async call() {
        if (this.method == 'GET') {
            return await fetch(this.url, {
                method: this.method,
                headers: {
                    Authorization: 'Berear ' + this.token,
                    'Content-Type': 'application/json',
                },
            })
        } else if (this.method == 'POST') {
            return await fetch(this.url, {
                method: this.method,
                headers: {
                    Authorization: 'Berear ' + this.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.body),
            })
        }
    }
}
