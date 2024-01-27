import pageClass from '../utils/pageClass.js'
import DevManager from '../../DevManager.js'
import UserService from '../services/userService.js'
import AlertBox from '../utils/AlertBox.js'

export default class indexPage extends pageClass {
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

    users = []

    userService = new UserService()

    #path = new DevManager().get()

    constructor() {
        super()

        this.handleHTML()
    }

    async handleHTML() {
        this.user = { ...(await this.getUserData()) }

        this.users = await this.getUsers()

        console.log(this.users)

        this.users.forEach((user) => {
            this.generateProfile(
                user.first_name,
                user.age,
                user.location,
                user.description,
                user.favorite_genres,
                user.user_id,
                user.avatar
            )
        })

        document.getElementById('avatar').src = '../../api/avatars/' + this.user.avatar
        document.getElementById('fav-song-title').value = this.user.favourite_song_title
        document.getElementById('fav-song-artist').value = this.user.favourite_song_artist
        document.getElementById('fav-artist').value = this.user.favourite_artist
        document.getElementById('profile-wrapper-location').innerText = this.user.location

        const editProfileButton = document.getElementById('main-page-edit-profile-button')

        editProfileButton.addEventListener('click', () => {
            window.location.href = this.#path + 'profile.html'
        })

        const profileWrapperAge = document.getElementById('profile-wrapper-age')
        if (this.user.age) {
            profileWrapperAge.textContent = this.user.age
        } else {
            profileWrapperAge.textContent = 'Age not set'
        }

        const profileWarpperUsername = document.getElementById('profile-wrapper-username')
        if (this.user.first_name) {
            profileWarpperUsername.textContent = this.user.first_name + ', '
        } else {
            profileWarpperUsername.textContent = this.user.username
        }

        this.generateGenres()
    }

    async getUsers() {
        const users = await this.userService.getUsersProfiles()
        return users.res
    }

    generateGenres() {
        const genresDiv = document.getElementById('user-genres')
        genresDiv.innerHTML = ''
        for (let i = 0; i < this.user.genres.length; i++) {
            const element = document.createElement('div')
            element.classList.add('genre-badge')
            element.textContent = this.user.genres[i]
            genresDiv.appendChild(element)
        }
    }

    async generateProfile(first_name, age, location, description, xgenres, user_id, avatar) {
        const profileContainer = document.getElementsByClassName('main-page-profiles-conatiner')[0]

        const profileDiv = document.createElement('div')
        profileDiv.classList.add('main-page-profile-container')

        const profileWrapper = document.createElement('div')
        profileWrapper.classList.add('other-profile-wrapper')

        const profileImage = document.createElement('img')
        profileImage.classList.add('main-page-profiles-avatar')

        if (avatar) {
            profileImage.src = '../../api/avatars/' + avatar
        } else {
            profileImage.src = 'https://www.w3schools.com/howto/img_avatar.png'
        }

        const profileCredentials = document.createElement('div')
        profileCredentials.classList.add('index-wrapper-credencials')

        const usernameSpan = document.createElement('span')
        usernameSpan.innerText = first_name + ', ' + age
        const locationSpan = document.createElement('span')
        locationSpan.innerText = location

        const descriptionTextarea = document.createElement('textarea')
        descriptionTextarea.value = description
        descriptionTextarea.disabled = true

        const buttonsWrapper = document.createElement('div')
        buttonsWrapper.classList.add('main-page-profile-buttons-wrapper')

        const dislikeButton = document.createElement('button')
        dislikeButton.classList.add('main-page-profile-dislike-button')
        dislikeButton.innerText = 'X'

        dislikeButton.addEventListener('click', async () => {
            let res = await this.userService.dislikeUser(user_id)

            profileDiv.classList.add('main-page-profile-container-disliked')
            setTimeout(() => {
                profileContainer.removeChild(profileDiv)
            }, 300)
        })

        const likeButton = document.createElement('button')
        likeButton.classList.add('main-page-profile-like-button')
        likeButton.innerText = '✔'

        likeButton.addEventListener('click', async () => {
            let res = await this.userService.likeUser(user_id)

            if (res.message == 'PAIR_DETECTED') {
                new AlertBox('You have a match with ' + first_name + '!')
            }
            profileDiv.classList.add('main-page-profile-container-liked')
            setTimeout(() => {
                profileContainer.removeChild(profileDiv)
            }, 300)
        })

        const favouriteGenres = document.createElement('h2')
        favouriteGenres.innerText = 'Favourite genres'

        const genres = xgenres.split(',')

        const genresDiv = document.createElement('div')
        genresDiv.classList.add('main-page-other-user-genres')

        genresDiv.innerHTML = ''
        for (let i = 0; i < genres.length; i++) {
            const element = document.createElement('div')
            element.classList.add('genre-badge')
            element.textContent = genres[i]
            genresDiv.appendChild(element)
        }

        buttonsWrapper.appendChild(dislikeButton)
        buttonsWrapper.appendChild(likeButton)
        profileCredentials.appendChild(usernameSpan)
        profileCredentials.appendChild(locationSpan)
        profileWrapper.appendChild(profileImage)
        profileWrapper.appendChild(profileCredentials)
        profileDiv.appendChild(profileWrapper)
        profileDiv.appendChild(descriptionTextarea)
        profileDiv.appendChild(favouriteGenres)
        profileDiv.appendChild(genresDiv)
        profileDiv.appendChild(buttonsWrapper)
        profileContainer.appendChild(profileDiv)
    }
}
