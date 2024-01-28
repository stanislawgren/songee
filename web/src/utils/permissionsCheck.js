export default class permissionsCheck {

    constructor() {
        this.token = window.localStorage.getItem('token')
    }

    async check(requiredPermissions) {
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

        let userPermissions = res.permissions

        const sum = 0
        const required = requiredPermissions.reduce((accumulator, require) => accumulator + require, sum)
        let binaryUser = parseInt(userPermissions).toString(2)
        let binaryRequired = parseInt(required).toString(2)

        while (binaryUser.length != binaryRequired.length) {
            if (binaryUser.length < binaryRequired.length) {
                binaryUser = '0' + binaryUser
            } else {
                binaryRequired = '0' + binaryRequired
            }
        }
        let authenticationSuccess = false

        for (let i = 0; i < binaryUser.length; i++) {
            if (binaryUser[i] == binaryRequired[i] && binaryUser[i] == '1') {
                authenticationSuccess = true
            }
        }

        return authenticationSuccess
    }
}
