import Authorization from './Authorization.js'
import DevManager from '../../DevManager.js'
import getServerProps from './getServerProps.js'
import CustomMenu from '../components/Menu.js'

export default class pageClass {
    #authorized = new Authorization().autorized
    #path = new DevManager().get()

    constructor() {
        const menu = new CustomMenu()
        if (!this.#authorized) {
            window.location.href = this.#path + 'login.html'
        }
        new getServerProps('/xd', { xd: 'xd' })
        
        this.#handleNavbar()
    }

    #handleNavbar() {
        const menuButton = document.getElementById('menu-button')
        menuButton.addEventListener('click', () => {
            document.getElementsByTagName('custom-menu').item(0).classList.toggle('menu-active')
        })
    }

    handleHTML() {
        throw new Error('You have to implement the method handleHTML()!')
    }
}
