const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { redirectIfAuth } = require('../middleware/auth');

// Login page
router.get('/login', redirectIfAuth, (req, res) => {
    res.render('learners/login', {
        title: 'Login - SkillLink',
        currentPage: 'login',
        error: req.session.error || null,
        success: req.session.success || null
    });
    
    // Clear flash messages
    delete req.session.error;
    delete req.session.success;
});

// Signup page
router.get('/signup', redirectIfAuth, (req, res) => {
    res.render('learners/signup', {
        title: 'Join SkillLink - Sign Up',
        currentPage: 'signup',
        error: req.session.error || null,
        formData: req.session.formData || {}
    });
    
    // Clear flash messages and form data
    delete req.session.error;
    delete req.session.formData;
});

// Handle login POST
router.post('/login', async (req, res) => {
    try {
        const { email, password, remember } = req.body;
        
        // Authenticate user
        const user = await User.authenticate(email, password);
        
        // Store user in session
        req.session.user = user.toJSON();
        
        // Extend session if remember me is checked
        if (remember) {
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
        }
        
        req.session.success = 'Welcome back! You have been logged in successfully.';
        
        // Redirect to intended page or home
        const redirectTo = req.session.returnTo || '/';
        delete req.session.returnTo;
        res.redirect(redirectTo);
        
    } catch (error) {
        req.session.error = error.message;
        res.redirect('/learners/login');
    }
});

// Handle signup POST
router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;
        
        // Store form data in case of error
        req.session.formData = { firstName, lastName, email };
        
        // Validate passwords match
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }
        
        // Create user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
            userType: 'learner'
        });
        
        // Log in the new user
        req.session.user = user.toJSON();
        
        // Clear form data
        delete req.session.formData;
        
        req.session.success = 'Account created successfully! Welcome to SkillLink.';
        res.redirect('/');
        
    } catch (error) {
        req.session.error = error.message;
        res.redirect('/learners/signup');
    }
});

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/');
    });
});

// Logout GET route (for convenience)
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/');
    });
});

module.exports = router;