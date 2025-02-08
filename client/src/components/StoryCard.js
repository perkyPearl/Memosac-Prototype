import React, { useState } from "react";
import "../styles/StoryCard.css";
const StoryCard = ({ story }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    console.log("Media Path:", story.media); // ✅ Debugging Line
    console.log("Description:", story.description); // ✅ Debugging Line

    const imageUrl = story.media.startsWith("/uploads")
        ? `http://localhost:4000${story.media}` // Fix: Add Backend URL
        : story.media;

    return (
        <div
            className={`story-card ${isFlipped ? "flipped" : ""}`}
            onClick={() => setIsFlipped(!isFlipped)}>
            <div className="card-inner">
                <div className="card-front">
                    <img
                        src={imageUrl}
                        alt="Story"
                        
                        onError={(e) =>
                            (e.target.src =
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaqyEspSKOyAok-FhWNMqoYGTRi6vswnE99w&s")
                        } // ✅ Fallback image
                    />
                </div>
                <div className="card-back">
                    <div
                        className="story-description"
                        dangerouslySetInnerHTML={{ __html: story.description }}
                    />
                </div>
            </div>
        </div>
    );
};

export default StoryCard;