import pageClass from '../utils/pageClass.js'
import ApiCall from '../utils/apiCall.js'
import AlertBox from '../utils/AlertBox.js'

export default class ProfilePage extends pageClass {
    user = {
        username: '',
        email: '',
        avatar: '',
        description: '',
    }

    constructor() {
        super()
        this.handleHTML()
    }

    async handleHTML() {
        this.user = await this.getUserData()
        console.log(this.user)
        document.getElementById('first-name').value = this.user.first_name
        document.getElementById('last-name').value = this.user.last_name
        document.getElementById('location').value = this.user.location

        document.getElementById('avatar').src = '../../api/avatars/' + this.user.avatar

        const saveButton = document.getElementById('save-profile-data-button')
        saveButton.addEventListener('click', () => {
            this.save()
        })

        const editButton = document.getElementsByClassName('edit-profile-button')[0]
        const fileInput = document.getElementById('avatar-input')
        fileInput.addEventListener('change', () => {
            this.uploadFile()
        })

        editButton.addEventListener('click', (e) => {
            e.preventDefault()
            console.log(fileInput)
            fileInput.click()
        })
    }

    async save() {
        const firstName = document.getElementById('first-name').value
        const lastName = document.getElementById('last-name').value
        const location = document.getElementById('location').value
        let res
        await new ApiCall('/user/updateProfile', 'POST', {
            id: this.user.user_id,
            firstName: firstName,
            lastName: lastName,
            location: location,
        })
            .call()
            .then((response) => response.json())
            .then((data) => (res = data))
            .catch((error) => console.error(error))

        if (res.message == 'OK') {
            new AlertBox('Profile data saved')
        }

        if (res.error) {
            new AlertBox(res.error)
            return
        }
    }

    async uploadFile() {
        const fileInput = document.getElementById('avatar-input')
        console.log(fileInput)
        const file = fileInput.files[0]

        if (file) {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('username', this.user.username)

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
        } else {
            console.warn('No file selected.')
        }
    }
}
