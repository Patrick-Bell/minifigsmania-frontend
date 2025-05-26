import axios from "axios";

export const getPromotions = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/promotions`, { withCredentials: true });
    return response.data
}