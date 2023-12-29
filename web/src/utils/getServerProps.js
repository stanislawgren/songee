export default class getServerProps {
    constructor(url, body) {
        this.body = body
        this.user = {}
        this.props = []
        this.url = 'http://localhost:8080/api/' + url
        this.err = []
        this.getUserData()
    }

    async getUserData() {
        await fetch('http://localhost:8080/api/user/getData', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())
            .then((data) => {
                this.user = data
            })
            .catch((error) => this.err.push(error))
    }

    async call() {
        await fetch(this.url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())
            .then((data) => {
                this.props = data
            })
            .catch((error) => this.err.push(error))
    }
}
