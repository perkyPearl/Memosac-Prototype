const jwt = require("jsonwebtoken");

const loginUser = (req, res) => {
    const { email, password } = req.body;
    
    
    if (email === "test@example.com" && password === "password") {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });

        
        res.cookie("token", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production"
        });

        return res.json({ message: "Login successful!", token });
    }
    
    return res.status(401).json({ message: "Invalid credentials" });
};

module.exports = { loginUser };

