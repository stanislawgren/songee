export default class Authorization {
    #token = window.localStorage.getItem('token')
    autorized = false
    
    constructor() {
       if(this.#token) {
           if(this.#token) {
               this.autorized = true
           }
       } else {
           this.autorized = false
       }
    }
}