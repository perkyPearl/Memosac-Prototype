const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoute"); 
const connectDB = require("./utils/database");
const { storeFilesLocally } = require("./utils/aws");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const postRoutes = require("./routes/postRoute");
const fs = require("fs");
const storyRoutes = require("./routes/storyRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
require("dotenv").config();

dotenv.config();
const app = express();
const port = 4000;
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.json()); 
app.use(cookieParser()); 
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // ✅ Serves uploaded images
app.use("/api/auth", authRoutes);
app.use("/post", postRoutes);
app.use("/api", galleryRoutes);

app.get("/", (req, res) => {
    res.send("Jai kara sherawali da bol saache darbar ki Jai!✨");
});

connectDB();

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use("/api/auth", authRoutes);
app.use("/api/stories", storyRoutes);

app.get("/", (req, res) => {
    res.send("Jai kara sherawali da bol saache darbar ki Jai!✨");
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.Secret, (err, info) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token" });
    res.json(info);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});