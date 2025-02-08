const express = require("express");
const multer = require("multer");

const {
    createStory,
    getAllStories,
} = require("../controllers/storyContoller");

const router = express.Router();

// Multer setup for file uploads (stores in memory buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 📌 Define API Routes
router.post("/create", upload.single("media"), createStory); // Create a new story
router.get("/", getAllStories); // Fetch all stories

module.exports = router;