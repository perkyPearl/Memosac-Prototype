const express = require("express");
const connectDB = require("./utils/database");
const { storeFilesLocally } = require("./utils/aws");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

require("dotenv").config();

const app = express();
const port = 4000;

connectDB();

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});