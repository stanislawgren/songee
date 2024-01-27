import pageClass from '../utils/pageClass.js'
import ApiCall from '../utils/apiCall.js'
import AlertBox from '../utils/AlertBox.js'
import PageService from '../services/pageService.js'
import FileService from '../services/fileService.js'

export default class ProfilePage extends pageClass {
    user = {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        avatar: '',
        description: '',
        age: '',
        location: '',
        favourite_song_title: '',
        favourite_song_artist: '',
        favourite_artist: '',
        genres: [],
    }

    genres = []

    constructor() {
        super()
        this.pageService = new PageService()
        this.fileService = new FileService()
        this.handleHTML()
    }

    async handleHTML() {
        const pageData = await this.pageService.getPageData()

        for (let i = 0; i < pageData.res.length; i++) {
            this.genres.push(pageData.res[i].name)
        }

        this.user = { ...(await this.getUserData()) }

        document.getElementById('first-name').value = this.user.first_name
        document.getElementById('last-name').value = this.user.last_name
        document.getElementById('location').value = this.user.location
        document.getElementById('description').value = this.user.description
        document.getElementById('age').value = this.user.age
        document.getElementById('fav-song-title').value = this.user.favourite_song_title
        document.getElementById('fav-song-artist').value = this.user.favourite_song_artist
        document.getElementById('fav-artist').value = this.user.favourite_artist

        if(this.user.gender == 'm') {
            document.getElementsByName('gender')[0].checked = true
            document.getElementsByName('gender')[1].checked = false
        } else {
            document.getElementsByName('gender')[0].checked = false
            document.getElementsByName('gender')[1].checked = true
        }

        const profileWarpperUsername = document.getElementById('profile-wrapper-username')
        if (this.user.first_name) {
            profileWarpperUsername.textContent = this.user.first_name + ', '
        } else {
            profileWarpperUsername.textContent = this.user.username
        }

        const profileWrapperAge = document.getElementById('profile-wrapper-age')
        if (this.user.age) {
            profileWrapperAge.textContent = this.user.age
        } else {
            profileWrapperAge.textContent = 'Age not set'
        }

        this.generateGenres()

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
            fileInput.click()
        })

        const genre = document.getElementById('genre-input')
        genre.addEventListener('input', (e) => {
            this.genreSearch(e.target.value)
        })

        genre.addEventListener('focus', () => {
            document.getElementById('genres-list').classList.add('list-active')
        })
    }

    async save() {
        const firstName = document.getElementById('first-name').value
        const lastName = document.getElementById('last-name').value
        const location = document.getElementById('location').value
        const descrition = document.getElementById('description').value
        const age = document.getElementById('age').value
        const favouriteSongTitle = document.getElementById('fav-song-title').value
        const favouriteSongArtist = document.getElementById('fav-song-artist').value
        const favouriteArtist = document.getElementById('fav-artist').value

        const gender = document.getElementsByName('gender')[0].checked ? 'm' : 'f'

        let res
        await new ApiCall('/user/updateProfile', 'POST', {
            id: this.user.user_id,
            firstName: firstName,
            lastName: lastName,
            location: location,
            description: descrition,
            age: age,
            genres: this.user.genres,
            favouriteSongArtist: favouriteSongArtist,
            favouriteSongTitle: favouriteSongTitle,
            favouriteArtist: favouriteArtist,
            gender: gender,
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

    generateGenres() {
        const genresDiv = document.getElementById('user-genres')
        genresDiv.innerHTML = ''
        for (let i = 0; i < this.user.genres.length; i++) {
            const element = document.createElement('div')
            element.classList.add('genre-badge')
            element.textContent = this.user.genres[i]
            element.addEventListener('click', () => {
                this.handleGenres(this.user.genres[i])
            })
            genresDiv.appendChild(element)
        }
    }

    handleGenres(value) {
        if (this.user.genres.includes(value)) {
            let index = this.user.genres.indexOf(value)
            if (index !== -1) {
                this.user.genres.splice(index, 1)
            }
        } else {
            this.user.genres.push(value)
        }

        this.generateGenres()
    }

    async genreSearch(value) {
        const lista = document.getElementById('genres-list')
        const genre = document.getElementById('genres-list')
        lista.innerHTML = ''

        if (value == '') {
            if (genre.classList.contains('list-active')) genre.classList.remove('list-active')
            return
        }

        if (!genre.classList.contains('list-active')) genre.classList.add('list-active')

        for (let i = 0; i < this.genres.length; i++) {
            if (this.genres[i].includes(value)) {
                const elementListy = document.createElement('li')
                elementListy.textContent = this.genres[i]

                elementListy.addEventListener('click', (e) => {
                    if (genre.classList.contains('list-active')) genre.classList.remove('list-active')

                    this.handleGenres(e.target.textContent)
                })

                lista.appendChild(elementListy)
            }
        }
    }

    async uploadFile() {
        const fileInput = document.getElementById('avatar-input')
        const file = fileInput.files[0]

        if (file) {
            this.fileService.uploadFile({ file: file, username: this.user.username })
        } else {
            console.warn('No file selected.')
        }
    }
}
