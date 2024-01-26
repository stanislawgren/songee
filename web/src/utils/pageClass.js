import Authorization from './Authorization.js'
import DevManager from '../../DevManager.js'
import getServerProps from './getServerProps.js'
import CustomMenu from '../components/Menu.js'

export default class pageClass extends getServerProps {
    #authorized = new Authorization().autorized
    #path = new DevManager().get()

    constructor() {
        super('/api/page/getProfilePage', {})

        const menu = new CustomMenu()
        if (!this.#authorized) {
            window.location.href = this.#path + 'login.html'
        }

        this.#handleNavbar()
    }

    #handleNavbar() {
        const homePageButton = document.getElementById('home-page-button')
        homePageButton.addEventListener('click', () => {
            window.location.href = this.#path + 'index.html'
        })

        const menuButton = document.getElementById('menu-button')
        menuButton.addEventListener('click', () => {
            document.getElementsByTagName('custom-menu').item(0).classList.toggle('menu-active')
        })
    }

    handleHTML() {
        throw new Error('You have to implement the method handleHTML()!')
    }
}
