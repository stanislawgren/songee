export default class permissions {
    #permissions = { admin: 4, mod: 2, user: 1 }

    get() {
        return this.#permissions
    }
}
