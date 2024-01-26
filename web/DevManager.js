export default class DevManager {
    #type = "prod"
    #paths = {
        "dev": "http://localhost:5500/songee/web/pages/",
        "prod": "http://localhost:3000/"

    }

    get(){
        return this.#paths[this.#type]
    }
}