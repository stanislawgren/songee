export default class ApiCall {
    constructor(url, method, body) {
        this.url = 'http://localhost:8080/api/' + url
        this.method = method
        this.body = body
        this.props = []
    }

    async call() {
        if (this.method == 'GET') {
            await fetch(this.url, {
                method: this.method,
                headers: { 'Content-Type': 'application/json' },
            })
                .then((response) => response.json())
                .then((data) => (this.props = data))
                .catch((error) => console.error(error))
            return
        } else if (this.method == 'POST') {
            await fetch(this.url, {
                method: this.method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.body),
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error(error))
        }
    }
}
