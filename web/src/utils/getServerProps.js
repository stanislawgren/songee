import ApiCall from './apiCall.js'

export default class getServerProps  {
    constructor() {
        this.token = window.localStorage.getItem('token')
        this.err = []
    }

    async getUserData() {
        let res 
        await fetch('http://localhost:8080/api/user/getData', {
            method: 'GET',
            headers: {
                Authorization: 'Berear ' + this.token,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                res = data.res
                if (data.message == 'UNAUTHORIZED') {
                    window.localStorage.removeItem('token')
                    window.location.reload()
                }
            })
            .catch((error) => {
                console.error(error)
            })
        return res
    }
}
