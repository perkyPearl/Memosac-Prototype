const path = require("path");
const Story = require("../models/storyModel");
const { storeFilesLocally } = require("../utils/aws");
const fs = require("fs");

exports.createStory = async (req, res) => {
    try {
        const { description, font, isBold, isItalic, isUnderline } = req.body;
         if (!req.file) {
             return res.status(400).json({ error: "No file uploaded" });
         }
        const storageDir = path.join(__dirname, "../uploads");

         if (!fs.existsSync(storageDir)) {
             fs.mkdirSync(storageDir, { recursive: true });
         }
        const storedFilePaths = await storeFilesLocally([req.file], storageDir);

        const newStory = new Story({
            media: storedFilePaths[0], // Path to the stored file
            description,
            font,
            isBold,
            isItalic,
            isUnderline,
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
