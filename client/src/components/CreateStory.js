import React, { useState } from "react";
import { createStory } from "../utils/api";

const CreateStory = ({ setStories }) => {
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [font, setFont] = useState("Arial");
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please upload an image or video.");
            return;
        }

        const formData = new FormData();
        formData.append("media", file);
        formData.append("description", description);
        formData.append("font", font);
        formData.append("isBold", isBold);
        formData.append("isItalic", isItalic);
        formData.append("isUnderline", isUnderline);

        try {
            const newStory = await createStory(formData);
            setStories((prev) => [newStory.story, ...prev]); // Update UI with new story
            setDescription("");
            setFile(null);
        } catch (error) {
            console.error("❌ Failed to create story:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="create-story-form">
            <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => setFile(e.target.files[0])}
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a short description..."
                required
            />

            {/* Text Formatting Options */}
            <div className="text-options">
                <select onChange={(e) => setFont(e.target.value)}>
                    <option value="Arial">Arial</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                </select>
                <button
                    type="button"
                    onClick={() => setIsBold(!isBold)}
                    className={isBold ? "active" : ""}>
                    B
                </button>
                <button
                    type="button"
                    onClick={() => setIsItalic(!isItalic)}
                    className={isItalic ? "active" : ""}>
                    I
                </button>
                <button
                    type="button"
                    onClick={() => setIsUnderline(!isUnderline)}
                    className={isUnderline ? "active" : ""}>
                    U
                </button>
            </div>

            <button type="submit">Upload Story</button>
        </form>
    );
};

export default CreateStory;