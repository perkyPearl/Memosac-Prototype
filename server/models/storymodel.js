const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    media: String, // Image or video URL
    description: String,
    createdAt: { type: Date, default: Date.now },
});

const Story = mongoose.model("Story", storySchema);
module.exports = Story;