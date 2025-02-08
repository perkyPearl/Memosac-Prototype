import { API } from "./backend";

export const uploadData = async (formData) => {
    try {
        const response = await fetch("http://localhost:4000/api/add/images", {
            method: "POST",
            body: formData, // No need to set headers explicitly
        });

        return response.json();
    } catch (error) {
        console.error("Upload error:", error);
        return { error: "Failed to upload" };
    }
};

export const getImages = () => {
    return fetch(`${API}/images`, {
        method: "GET",
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    `Error fetching images: ${response.statusText}`
                );
            }
            return response.json();
        })
        .catch((err) => console.error("Error fetching images:", err));
};

export const getImageUrl = (ImageId) => {
    const url = ImageId
        ? `${API}/images/${ImageId}`
        : "https://example.com/default-image.jpg";
    return url;
};

export const deleteImage = (ImageId) => {
    return fetch(`${API}/images/${ImageId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error deleting image: ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => console.log("Image deleted successfully:", data))
        .catch((err) => console.error("Error deleting image:", err));
};