import axios from 'axios'

const baseUrl = '/api/login'

export const loginService = async credentials => {
    const { data } = await axios.post(baseUrl, credentials)
    return data
}
