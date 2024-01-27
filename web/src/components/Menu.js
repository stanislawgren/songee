import DevManager from '../../DevManager.js'

export default class CustomMenu extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
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
