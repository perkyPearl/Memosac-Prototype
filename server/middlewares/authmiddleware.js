const jwt = require('jsonwebtoken'); 

const auth = (req, res, next) => {
    const token = req.cookies.token || req.header("authorization"); 
    
    if (!token) {
        return res.status(401).json({ message: "Access Denied! Please Login." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRETKEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid Details or Session Expired. Please Login again!" });
    }
};

module.exports = { auth };