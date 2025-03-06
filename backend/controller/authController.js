import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';

// Function to generate a JWT
const generateToken = (user) => {
    try {
        console.log("Controller JWT_SECRET:", process.env.JWT_SECRET);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        console.log("Generated Token:", token); // Debugging
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Token generation failed");
    }
};

// User Registration
const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        let user = await User.findOne({ email });
        if (user) {
            console.warn("Registration Attempt: Email already exists");
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ email, password: hashedPassword });

        await user.save();
        console.log("User registered:", user.email);

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// User Login
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.warn("Login Attempt: User not found -", email);
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.warn("Login Attempt: Invalid credentials -", email);
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user);
        console.log("Login Successful:", email, "| Token:", token);

        res.json({
            message: "Login successful",
            token,
            user: { id: user._id, email: user.email }
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export { register, login, generateToken };
