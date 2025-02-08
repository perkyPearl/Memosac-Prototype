const express = require("express");

const { loginUser } = require("../controllers/authcontroller");
const { auth } = require("../middlewares/authmiddleware");

const router = express.Router();

// Route for login
router.post("/login", loginUser);

module.exports = router;
