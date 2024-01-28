import DevManager from '../../DevManager.js'
import permissionsCheck from '../utils/permissionsCheck.js'
import permissions from '../utils/permissions.js'

export default class CustomMenu extends HTMLElement {
    permissionValues = new permissions().get()

    constructor() {
        super()
    }

    async connectedCallback() {
        let permissions = await new permissionsCheck()
        permissions = await permissions.check([this.permissionValues.admin])

        const shadowRoot = this.attachShadow({ mode: 'open' })
        const style = document.createElement('style')

        const logoutButton = document.createElement('button')
        logoutButton.textContent = 'Logout'
        logoutButton.classList.add('custom-menu-button')
        logoutButton.addEventListener('click', () => {
            window.localStorage.removeItem('token')
            window.location.href = new DevManager().get() + 'login.html'
        })

        const userProfileButton = document.createElement('button')
        userProfileButton.textContent = 'Profile'
        userProfileButton.classList.add('custom-menu-button')
        userProfileButton.addEventListener('click', () => {
            window.location.href = new DevManager().get() + 'profile.html'
        })

        const settingsButton = document.createElement('button')
        settingsButton.textContent = 'Settings'
        settingsButton.classList.add('custom-menu-button')
        settingsButton.addEventListener('click', () => {
            window.location.href = new DevManager().get() + 'settings.html'
        })

        if (permissions) {
            const adminButton = document.createElement('button')
            adminButton.textContent = 'Admin Panel'
            adminButton.classList.add('custom-menu-button')
            adminButton.addEventListener('click', () => {
                window.location.href = new DevManager().get() + 'adminPanel.html'
            })
            shadowRoot.appendChild(adminButton)
        }

        const chatButton = document.createElement('button')
        chatButton.textContent = 'Chat'
        chatButton.classList.add('custom-menu-button')
        chatButton.addEventListener('click', () => {
            window.location.href = new DevManager().get() + 'chat.html'
        })

        style.textContent = `
            .custom-menu-button {
                background-color: #322f26;
                color: white;
                font-weight: bold;
                border: none;
                border-radius: 25px;
                padding: 10px;
                margin: 10px;
                cursor: pointer;
                transition:all 0.1s ease-in-out;
            }

            .custom-menu-button:hover {
                background-color: #ffc300;
                transition:all 0.1s ease-in-out;
            }
            `

        shadowRoot.appendChild(style)

        shadowRoot.appendChild(userProfileButton)
        shadowRoot.appendChild(chatButton)
        shadowRoot.appendChild(settingsButton)
        shadowRoot.appendChild(logoutButton)
    }

    disconnectedCallback() {
        console.log('Custom element removed from page.')
    }

    adoptedCallback() {
        console.log('Custom element moved to new page.')
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`)
    }
}

customElements.define('custom-menu', CustomMenu)
