import pageClass from '../utils/pageClass.js'
import PageService from '../services/pageService.js'

export default class ChatPage extends pageClass {
    constructor() {
        super()

        this.pageService = new PageService()
        this.handleHTML()
    }

    async handleHTML() {
        let res = await this.pageService.getChatPageData()

        for (let i = 0; i < res.res.length; i++) {
            let userCard = this.generateUserCard(res.res[i])
            document.getElementsByClassName('chat-container-profiles')[0].appendChild(userCard)
        }

        if (res.res.length == 0) {
            let userCard = document.createElement('div')
            userCard.classList.add('user-card')
            userCard.innerText = 'No pairs found'
            document.getElementsByClassName('chat-container-profiles')[0].appendChild(userCard)
        }

        document.getElementsByClassName('user-card')[0].classList.add('user-card-selected')
    }

    generateUserCard(user) {
        user = user[0]
        let userCard = document.createElement('div')
        userCard.classList.add('user-card')
        userCard.addEventListener('click', () => {
            let userCardSelected = document.getElementsByClassName('user-card-selected')

            for (let i = 0; i < userCardSelected.length; i++) {
                userCardSelected[i].classList.remove('user-card-selected')
            }

            userCard.classList.toggle('user-card-selected')
        })

        let userCardImage = document.createElement('img')
        userCardImage.classList.add('user-card-image')
        userCardImage.src = '../../api/avatars/' + user.avatar

        let userCardName = document.createElement('div')
        userCardName.classList.add('user-card-name')
        userCardName.innerText = user.first_name

        userCard.appendChild(userCardImage)
        userCard.appendChild(userCardName)

        return userCard
    }
}
