import axios from 'axios'

export const createComment = async (formData) => {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/comments`, { comment: formData } , { withCredentials: true })
    console.error("Error creating comment:", response)
    return response.data
}

export const fetchComments = async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/fetch-comments/${id}`, { withCredentials: true })
    return response.data
}

export const replyToComment = async (formData) => {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/replies`, { reply: formData }, { withCredentials: true })
    return response.data
}