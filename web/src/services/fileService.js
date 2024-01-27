export default class FileService {
    constructor() {
        this.token = window.localStorage.getItem('token')
    }
    
    async uploadFile({ file, username }) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('username', username)

        console.log(formData.get('file'))

        await fetch('http://localhost:8080/api/file/avatarUpload', {
            method: 'POST',
            headers: {
                Authorization: 'Berear ' + this.token,
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Server response:', data)
            })
            .catch((error) => {
                console.error('Error during file upload:', error)
            })
    }
}
