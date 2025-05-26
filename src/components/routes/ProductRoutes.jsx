import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export const getProducts = async () => {
    const response = await axios.get(`${apiUrl}/api/products`, { withCredentials: true })
    console.log('products')
    return response.data
}

export const getOneProduct = async (id) => {
    const response = await axios.get(`${apiUrl}/api/products/${id}`, { withCredentials: true })
    return response.data
}