import React, { useEffect, useState } from "react";
import { getStories } from "../utils/api";
import StoryCard from "../components/StoryCard";
import CreateStory from "../components/CreateStory";

const StoryPage = () => {
    const [stories, setStories] = useState([]);
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [showCreateForm, setShowCreateForm] = useState(false);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const data = await getStories();
                setStories(data);
            } catch (error) {
                console.error("❌ Error fetching stories:", error);
            }
        };
        fetchStories();
    }, []);

    const handleNextStory = () => {
        setCurrentStoryIndex((prevIndex) =>
            prevIndex + 1 < stories.length ? prevIndex + 1 : 0
        );
    };
    const handlePreviousStory = () => {
        setCurrentStoryIndex((prevIndex) =>
            prevIndex - 1 >= 0 ? prevIndex - 1 : stories.length - 1
        );
    };
    const handleStoryCreated = (newStory) => {
        setStories((prev) => [newStory, ...prev]); // ✅ Add new story to the list
        setShowCreateForm(false); // ✅ Close popup after creation
    };

    return (
        <div className="story-container">
            <div class="plusalign">
                <h2>📖 Storytelling</h2>
                <button
                    className="plus-icon"
                    onClick={() => setShowCreateForm(true)}>
                    ➕
                </button>
            </div>

            {showCreateForm && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button
                            className="close-popup"
                            onClick={() => setShowCreateForm(false)}>
                            ✖
                        </button>
                        <CreateStory setStories={handleStoryCreated} />
                    </div>
                </div>
            )}

            {stories.length > 0 ? (
                <div className="story-wrapper">
                    {/* Left Arrow Button */}
                    <button
                        className="arrow-button left-arrow"
                        onClick={handlePreviousStory}>
                        ⬅
                    </button>
                    <StoryCard story={stories[currentStoryIndex]} />
                    <button
                        className="arrow-button right-arrow"
                        onClick={handleNextStory}>
                        ➡
                    </button>
                </div>
            ) : (
                <p>No stories available. Start by creating one!</p>
            )}
        </div>
    );
};

export default StoryPage;
