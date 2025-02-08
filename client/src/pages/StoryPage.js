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

    return (
        <div className="story-container">
            <h2>📖 Storytelling</h2>
            <button
                className="create-story-btn"
                onClick={() => setShowCreateForm(!showCreateForm)}>
                {showCreateForm ? "Close" : "Create Story"}
            </button>

            {showCreateForm && <CreateStory setStories={setStories} />}

            {stories.length > 0 ? (
                <>
                    <StoryCard story={stories[currentStoryIndex]} />
                    <button
                        className="next-story-btn"
                        onClick={handleNextStory}>
                        Next Story ➡️
                    </button>
                </>
            ) : (
                <p>No stories available. Start by creating one!</p>
            )}
        </div>
    );
};

export default StoryPage;
