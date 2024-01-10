const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require("dotenv").config();

const userController = {
    // User registration
    register: async (req, res) => {
        try {
            const { username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({ username, password: hashedPassword });
            await newUser.save();

            res.status(201).send('User registered successfully');
        } catch (error) {
            res.status(500).send('Error in registration');
        }
    },

    // User login
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });

            if (!user || !await bcrypt.compare(password, user.password)) {
                return res.status(401).send('Invalid credentials');
            }

            const token = jwt.sign({ userId: user._id },process.env.JWT_SECRET);
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).send('Error in login');
        }
    }
};

module.exports = userController;
