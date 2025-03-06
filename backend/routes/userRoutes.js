import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js'; // ✅ Import middleware

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ id: user._id, name: user.name, email: user.email, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required!' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: "Login successful", token, user: { _id: user._id, email: user.email, name: user.name } });
        
    } catch (error) {
        res.status(500).json({ message: 'Server error!', error });
    }
});

// Protected route example
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// 🔴 LOGOUT ROUTE (Add this to the end of your file)
const blacklist = new Set(); // Simple in-memory token blacklist

router.post('/logout', authMiddleware, (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }
    blacklist.add(token);
    res.json({ message: 'Logout successful' });
});

// Middleware to check if token is blacklisted
const checkBlacklist = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (blacklist.has(token)) {
        return res.status(401).json({ message: 'Token expired or logged out' });
    }
    next();
};

// Apply blacklist check to protected routes
router.use(checkBlacklist);

export default router;
