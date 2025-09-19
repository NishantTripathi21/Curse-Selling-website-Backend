const { Router } = require("express");
const userMiddleware = require("../middlewares/user");
const { User, Course } = require("../DB");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const router = Router();

// User Routes
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this username already exists' });
        }
        
        // Create new user
        const newUser = await User.create({ username, password });
        res.status(201).json({ message: "User created successfully", userId: newUser._id });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create user', error: err.message });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Incorrect username or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect username or password" });
        }

        const token = jwt.sign({ username, role: 'user' }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
        
    } catch(err) {
        res.status(500).json({ message: 'Failed to sign in', error: err.message });
    }
});

router.get('/courses', async (req, res) => {
  try {
    const response = await Course.find({});
    res.json({ courses: response });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch courses', error: err.message });
  }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const username = req.username; 

        await User.updateOne({
            username: username
        }, {
            "$push": {
                purchasedCourses: courseId
            }
        });
        res.json({ message: "Purchase complete!" });
    } catch (err) {
        res.status(500).json({ message: 'Failed to purchase course', error: err.message });
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.username }).populate('purchasedCourses');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ purchasedCourses: user.purchasedCourses });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch purchased courses', error: err.message });
    }
});

module.exports = router;