import axios from 'axios'

export const createMessage = async (formData) => {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/messages`, { message: formData } , { withCredentials: true })
    return response.data
}