const { Router } = require("express");
const userMiddleware = require("../middlewares/user");
const { Admin, User, Course } = require("../DB");
const {JWT_SECRET} = require("../config");
const router = Router();
const jwt = require("jsonwebtoken");
// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    User.create({
        username, 
        password
    })
    res.json({
        message: "User created successfully"
    })

});

router.post('/signin', async (req, res) => {
    // Implement user signin logic
    const username = req.body.username;
        const password = req.body.password;
        console.log(JWT_SECRET);
    
        const user = await User.find({
            username,
            password
        })
        if (user) {
            const token = jwt.sign({
                username
            }, JWT_SECRET);
    
            res.json({
                token
            })
        } else {
            res.status(411).json({
                message: "Incorrect email and pass"
            })
        }
});

router.get('/courses', async (req, res) => {
  try {
    const response = await Course.find({});
    res.json({ courses: response });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    await User.updateOne({
        username: username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
    })
    res.json({
        message: "Purchase complete!"
    })

});

router.get('/purchasedCourses', userMiddleware,async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.username
    });

    console.log(user.purchasedCourses);
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router