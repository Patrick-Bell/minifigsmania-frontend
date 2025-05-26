import axios from 'axios'

export const getMyReviews = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/my-reviews`, { withCredentials: true })
    return response.data
}

export const getAllReviews = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/reviews`, { withCredentials: true })
    return response.data
}

export const getOneReview = async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/reviews/${id}`, { withCredentials: true })
    return response.data
}