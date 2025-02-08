import React, { useEffect, useState } from "react";
import { getStories } from "../utils/api";
import StoryCard from "../components/StoryCard";
import CreateStory from "../components/CreateStory";

const StoryPage = () => {
    const [stories, setStories] = useState([]);
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

    useEffect(() => {
        const fetchStories = async () => {
            const data = await getStories();
            setStories(data);
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
            <CreateStory setStories={setStories} />
            {stories.length > 0 && (
                <>
                    <StoryCard story={stories[currentStoryIndex]} />
                    <button onClick={handleNextStory}>Next Story ➡️</button>
                </>
            )}
        </div>
    );
};

export default StoryPage;