import axios from 'axios'

export const getOrders = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orders`, { withCredentials: true })
    return response.data
}

export const getMyOrders = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/my-orders`, { withCredentials: true })
    return response.data
}

export const trackOrder = async (trackingId) => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/track-order/${trackingId}`, { withCredentials: true })
    return response.data
}