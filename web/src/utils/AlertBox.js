export default class AlertBox {
    constructor(message) {
        this.message = message
        this.addAlertBox()
    }

    addAlertBox() {
        let isAlertOnPage = document.getElementsByClassName('alert-box').length > 0
        if (isAlertOnPage) return
        
        let alertBox = document.createElement('div')
        alertBox.id = 'error'
        alertBox.classList.add('alert-box')
        alertBox.innerHTML = this.message

        let alertBoxBackground = document.createElement('div')
        alertBoxBackground.classList.add('alert-box-background')

        let closeButton = document.createElement('button')
        closeButton.classList.add('close-button')
        closeButton.innerHTML = 'OK'
        closeButton.style.marginTop = '20px'
        closeButton.style.width = '150px'
        alertBox.style.zIndex = '10'
        closeButton.addEventListener('click', () => {
            alertBox.remove()
            alertBoxBackground.remove()
        })
        alertBox.appendChild(closeButton)

        document.body.appendChild(alertBox)
        document.body.appendChild(alertBoxBackground)
    }
}
