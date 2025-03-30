import axios from "axios";

const API_KEY = "49365626-6bf9b0bb5948f971197bdaec6";
const BASE_URL = "https://pixabay.com/api/";
const PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                per_page: PER_PAGE,
                page: page,
            },
        });
        
        return response.data;
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
}