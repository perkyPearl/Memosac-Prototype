const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoute"); 
const connectDB = require("./utils/database");
const { storeFilesLocally } = require("./utils/aws");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storyRoutes = require("./routes/storyRoutes");

require("dotenv").config();

dotenv.config();
const app = express();
const port = 4000;

app.use(express.json()); 
app.use(cookieParser()); 
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



const storage = multer.memoryStorage();
const upload = multer({ storage });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});