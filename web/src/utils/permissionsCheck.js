export default class pageClass {
    perms = {
        1: 'user',
        2: 'mod',
        4: 'admin',
    }

    constructor() {
        this.token = window.localStorage.getItem('token')
    }

    async check() {
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

        let num = res.permissions

        const binaryRepresentation = [] 

        while (num > 0) {
            binaryRepresentation.unshift(num & 1) 
            num >>= 1 
        }

        const mappedNames = binaryRepresentation
            .map((binaryDigit, index) => {
                if (binaryDigit === 1) {
                    const powerOfTwo = Math.pow(2, index)
                    return this.perms[powerOfTwo]
                }
            })
            .filter(Boolean) 


        return mappedNames
    }
}
