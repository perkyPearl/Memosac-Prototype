const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoute"); 

dotenv.config();
const app = express();
const port = 4000;


app.use(express.json()); 
app.use(cookieParser()); 


app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Jai kara sherawali da bol saache darbar ki Jai!✨");
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});



