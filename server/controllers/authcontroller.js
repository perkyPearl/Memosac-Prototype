const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const secret = process.env.Secret || "secret";

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.PRIVATE_KEY,
        { expiresIn: "24h" }
      );
      res
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
          secure: false,
          sameSite: "Lax",
        })
        .json({
          id: user._id,
          username,
          token,
        });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error during login" });
  }
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error while registering user",
    });
  }
}

const googlelogin = async (req, res, next) => {
    const { username, email, profilePic } = req.body;
    
    try {
        if (!email) {
        return res.status(400).json({ message: "Email is required" });
        }
    
        let user = await User.findOne({ email });
        if (!user) {
        user = new User({
            username: username || email.split("@")[0],
            email,
            profilePic,
        });
        await user.save();
        }
        
        const token = jwt.sign({ username, id: user._id }, secret, {
        expiresIn: "7d",
        });
    
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        }).json({ id: user._id, username, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error while processing Google login" });
    }
};

module.exports = { loginUser,googlelogin,registerUser };