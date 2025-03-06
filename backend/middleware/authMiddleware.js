import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        console.log("Middleware JWT_SECRET:", process.env.JWT_SECRET);
        const authHeader = req.header('Authorization');
        
        if (!authHeader) {
            console.warn("🚨 No Authorization header provided");
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        const tokenParts = authHeader.split(' ');

        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
            console.warn("🚨 Invalid Authorization header format:", authHeader);
            return res.status(401).json({ message: "Invalid token format" });
        }

        const token = tokenParts[1];

        if (!token) {
            console.warn("🚨 Token missing in Authorization header:", authHeader);
            return res.status(401).json({ message: "Token missing" });
        }

        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET || "your_super_secret_key");
            req.user = verified; // Attach user data to request

            console.log("✅ Token Verified:", verified);
            next();
        } catch (error) {
            console.error("❌ Token Verification Failed:", error.message);
            return res.status(403).json({ message: "Invalid token", error: error.message });
        }

    } catch (error) {
        console.error("❌ Middleware Error:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export default authMiddleware;
