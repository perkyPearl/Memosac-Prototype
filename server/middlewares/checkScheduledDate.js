const TimeCapsule = require("../models/TimeCapsule");

const checkScheduledDate = async (req, res, next) => {
  const timeCapsuleId = req.params.id;
  const now = new Date();

  try {
    const timeCapsule = await TimeCapsule.findById(timeCapsuleId);

    if (!timeCapsule) {
      return res.status(404).json({ error: "Time Capsule not found" });
    }

    if (now >= timeCapsule.scheduled_date) {
      timeCapsule.status = "unlocked";
      await timeCapsule.save();
      next();
    } else {
      return res.status(403).json({ message: "This time capsule is locked." });
    }
  } catch (error) {
    console.error("Error checking scheduled date:", error);
    res.status(500).json({ error: "Failed to check scheduled date" });
  }
};

module.exports = checkScheduledDate;