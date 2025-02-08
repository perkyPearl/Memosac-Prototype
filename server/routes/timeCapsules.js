const express = require("express");
const router = express.Router();
const TimeCapsule = require("../models/TimeCapsule");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { storeFilesLocally } = require("../utils/aws");
const checkScheduledDate = require("../middlewares/checkScheduledDate");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

router.post("/", upload.array("files"), async (req, res) => {
  const { title, releaseDateTime, description } = req.body;
  const files = req.files;
  const userId = req.body.userId;

  if (!files || files.length === 0) {
    return res.status(400).json({ error: "No files uploaded." });
  }

  try {
    const storedFilePaths = await storeFilesLocally(files, uploadsDir);

    const fileUrls = storedFilePaths.map(
      (filePath) => `/uploads/${path.basename(filePath)}`
    );

    const newTimeCapsule = new TimeCapsule({
      title,
      scheduled_date: new Date(releaseDateTime),
      files: fileUrls,
      description,
      author: userId,
      status: "locked",
    });

    await newTimeCapsule.save();

    res.status(201).json({
      message: "Time capsule created successfully",
      data: newTimeCapsule,
    });
  } catch (error) {
    console.error("Error storing files locally:", error);
    res.status(500).json({ error: "Error storing files locally" });
  }
});

router.get("/", async (req, res) => {
  try {
    const capsules = await TimeCapsule.find({}, "title scheduled_date status");
    res.status(200).json(capsules);
  } catch (error) {
    console.error("Error fetching time capsules:", error);
    res.status(500).json({ error: "Failed to fetch time capsules" });
  }
});

router.get("/:id", checkScheduledDate, async (req, res) => {
  const timeCapsuleId = req.params.id;

  try {
    const timeCapsule = await TimeCapsule.findById(timeCapsuleId);

    if (!timeCapsule) {
      return res.status(404).json({ error: "Time Capsule not found" });
    }

    res.status(200).json(timeCapsule);
  } catch (error) {
    console.error("Error fetching time capsule:", error);
    res.status(500).json({ error: "Failed to fetch time capsule" });
  }
});

// Add delete route
router.delete("/:id", async (req, res) => {
  const timeCapsuleId = req.params.id;

  try {
    const timeCapsule = await TimeCapsule.findByIdAndDelete(timeCapsuleId);

    if (!timeCapsule) {
      return res.status(404).json({ error: "Time Capsule not found" });
    }

    // Optionally, delete the associated files from the server
    timeCapsule.files.forEach((file) => {
      const filePath = path.join(__dirname, "../uploads", path.basename(file));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    res.status(200).json({ message: "Time Capsule deleted successfully" });
  } catch (error) {
    console.error("Error deleting time capsule:", error);
    res.status(500).json({ error: "Failed to delete time capsule" });
  }
});

module.exports = router;
