import ApiCall from './apiCall.js'

export default class getServerProps extends ApiCall {
    constructor(url, body) {
        super(url, 'GET', body)
        this.user = {}
        this.err = []
        this.getUserData()
    }

    async getUserData() {
        let res = await fetch('http://localhost:8080/api/user/getData', {
            method: 'GET',
            headers: {
                Authorization: 'Berear ' + this.token,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message == 'UNAUTHORIZED') {
                    window.localStorage.removeItem('token')
                    window.location.replace('http://localhost:5500/login.html')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
