const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { sendWelcomeEmail } = require('../utils/mailer');

router.get('/', (req, res) => {
    res.render('registration');
});

router.post('/', async (req, res) => {
    try {
        const { username, email, password, firstName, lastName, age, country, gender } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).send('Username or email already exists');
        }

        // Create new user
        const newUser = new User({
            username,
            email,
            password,
            firstName,
            lastName,
            age,
            country,
            gender
        });

        await newUser.save();
        await sendWelcomeEmail(newUser.email);
        res.send('Registration successful!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;