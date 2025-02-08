import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api/stories";

export const getStories = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching stories:", error);
        return [];
    }
};

// 📌 Upload a new story
export const createStory = async (formData) => {
    try {
        const response = await axios.post(API_BASE_URL, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("❌ Error creating story:", error);
        throw error;
    }
};