import ApiCall from '../utils/apiCall.js'

export default class PageService {
    async getPageData() {
        let res
        await new ApiCall('/page/getProfilePage', 'GET', {})
            .call()
            .then((response) => response.json())
            .then((data) => (res = data))
            .catch((error) => console.error(error))
        return res
    }
}
