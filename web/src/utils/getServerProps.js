import ApiCall from './apiCall.js'

export default class getServerProps extends ApiCall {
    constructor(url, method, body) {
        super(url, method, body)
        this.user = {}
        this.err = []
        this.getUserData()
    }

    async getUserData() {
        await fetch('http://localhost:8080/api/user/getData', {
            method: 'GET',
            headers: {
                'Authorization': 'Berear my-token',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => {
                this.user = data
            })
            .catch((error) => this.err.push(error))
    }
}
