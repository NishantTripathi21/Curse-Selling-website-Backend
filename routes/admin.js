const { Router } = require("express");
const adminMiddleware = require("../middlewares/admin");
const { Admin, Course } = require("../DB"); 
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(409).json({ message: 'Admin with this username already exists' });
        }

        // Create new admin
        const newAdmin = await Admin.create({ username, password });
        res.status(201).json({
            message: 'Admin created successfully',
            adminId: newAdmin._id
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create admin', error: err.message });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(401).json({ message: "Incorrect username or password" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect username or password" });
        }

        const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });

    } catch(err) {
        res.status(500).json({ message: 'Failed to sign in', error: err.message });
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    try {
        const { title, description, imageLink, price, published } = req.body;
        const newCourse = await Course.create({
            title,
            description,
            imageLink,
            price,
            published: published || false
        });

        res.status(201).json({
            message: 'Course created successfully',
            courseId: newCourse._id
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create course', error: err.message });
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    try {
        const response = await Course.find({});
        res.json({ courses: response });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch courses', error: err.message });
    }
});

module.exports = router;