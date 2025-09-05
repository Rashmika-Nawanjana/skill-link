const express = require('express');
const router = express.Router();

// Login page
router.get('/login', (req, res) => {
    res.render('learners/login', {
        title: 'Login - SkillLink',
        currentPage: 'login'
    });
});

// Signup page
router.get('/signup', (req, res) => {
    res.render('learners/signup', {
        title: 'Join SkillLink - Sign Up',
        currentPage: 'signup'
    });
});

// Handle login POST
router.post('/login', (req, res) => {
    // Handle login logic here
    res.redirect('/');
});

// Handle signup POST
router.post('/signup', (req, res) => {
    // Handle signup logic here
    res.redirect('/');
});

module.exports = router;