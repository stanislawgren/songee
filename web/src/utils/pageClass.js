import Authorization from './Authorization.js'
import DevManager from '../../DevManager.js'
import getServerProps from './getServerProps.js'

export default class pageClass {
    #authorized = new Authorization().autorized
    #path = new DevManager().get()

    constructor() {
        new getServerProps('/xd', { xd: 'xd' })
        if (!this.#authorized) {
            window.location.href = this.#path + 'login.html'
        }
    }
}
