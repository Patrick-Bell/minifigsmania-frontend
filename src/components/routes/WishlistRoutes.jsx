import axios from "axios";

export const myWishlist = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/my-wishlist`, { withCredentials: true })
    return response.data
}
