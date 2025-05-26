import axios from 'axios'

export const subscribeNewsletter = async (email) => {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/newsletters`, { newsletter: { email } }, { withCredentials: true })
    return response.data
}