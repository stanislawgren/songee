import AuthInterface from '../components/AuthInterface.js'
import ApiCall from '../utils/apiCall.js'

const authInterface = new AuthInterface()

const button = document.getElementById('exampleId')

button.addEventListener('click', () => {
    const apiCall = new ApiCall('login', 'POST', { example: 'example' })
    apiCall.call()
})
