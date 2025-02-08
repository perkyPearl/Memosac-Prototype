import React, { useState } from "react";

const StoryCard = ({ story }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const textStyle = {
        fontFamily: story.font || "Arial",
        fontWeight: story.isBold ? "bold" : "normal",
        fontStyle: story.isItalic ? "italic" : "normal",
        textDecoration: story.isUnderline ? "underline" : "none",
    };

    return (
        <div
            className={`story-card ${isFlipped ? "flipped" : ""}`}
            onClick={() => setIsFlipped(!isFlipped)}>
            <div className="card-inner">
                <div className="card-front">
                    <img
                        src={`http://localhost:4000${story.media}`}
                        alt="Story"
                    />
                </div>
                <div className="card-back">
                    <p style={textStyle}>{story.description}</p>
                </div>
            </div>
        </div>
    );
};

export default StoryCard;