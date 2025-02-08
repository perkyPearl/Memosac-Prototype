const path = require("path");
const Story = require("../models/storyModel");
const { storeFilesLocally } = require("../utils/aws");
const fs = require("fs");

exports.createStory = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const storageDir = path.join(__dirname, "../uploads");
        if (!fs.existsSync(storageDir)) {
            fs.mkdirSync(storageDir, { recursive: true });
        }

        // 📌 Store the uploaded file
        const storedFilePaths = await storeFilesLocally([req.file], storageDir);
        const mediaPath = `/uploads/${path.basename(storedFilePaths[0])}`;

        console.log(
            "📌 Description received from frontend:",
            req.body.description
        ); // ✅ Debugging Line

        // 📌 Create a new story
        const newStory = new Story({
            media: mediaPath,
            description: req.body.description || "<p>No Description</p>",
        });

        await newStory.save();
        res.status(201).json({
            message: "Story created successfully!",
            story: newStory,
        });
    } catch (error) {
        console.error("❌ Error creating story:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getAllStories = async (req, res) => {
    try {
        const stories = await Story.find().sort({ createdAt: -1 });
        res.json(stories);
    } catch (error) {
        console.error("❌ Error fetching stories:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
