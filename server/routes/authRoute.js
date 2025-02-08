const express = require("express");
const { loginUser, googlelogin, registerUser } = require("../controllers/authcontroller");

const router = express.Router();

router.post("/login", loginUser);
router.post("/google-login", googlelogin);
router.post("/register", registerUser);

module.exports = router;