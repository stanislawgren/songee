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

        const saveButton = document.getElementById('save-profile-data-button')
        saveButton.addEventListener('click', () => {
            this.save()
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

        if(res.message == 'OK') {
            new AlertBox('Profile data saved')
        }

        if (res.error) {
            new AlertBox(res.error)
            return
        }
    }
}
