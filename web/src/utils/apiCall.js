export default class ApiCall {
    constructor(url, method, body) {
        this.url = 'http://localhost:8080/' + url
        this.method = method
        this.body = body
    }

    async call() {
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
