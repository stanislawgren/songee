import Authorization from './Authorization.js'
import DevManager from '../../../DevManager.js'

export default class pageClass {
    #authorized = new Authorization().autorized
    #path = new DevManager().get()

    constructor() {
        console.log(this.#path)
        if(!this.#authorized) {
            window.location.href = this.#path + 'login'
        }
    }

}