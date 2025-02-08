import React, { useState } from "react";
import { createStory } from "../utils/api";
import Editor from "../Editor";

const CreateStory = ({ setStories }) => {
    const [file, setFile] = useState(null);
    const [content, setContent] = useState("");
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please upload an image or video.");
            return;
        }

        const formData = new FormData();
        formData.append("media", file);
        formData.append("description", content);
    

        try {
            const newStory = await createStory(formData);
            setStories((prev) => [newStory.story, ...prev]); // Update UI with new story
            setContent("");
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
            <Editor value={content} onChange={setContent} />

            <button type="submit">Upload Story</button>
        </form>
    );
};

export default CreateStory;