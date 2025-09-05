const express = require('express');
const path = require('path');
const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', require('./routes/index'));
app.use('/mentors', require('./routes/mentors'));
app.use('/learners', require('./routes/learners'));

// Error handling middleware
app.use((req, res, next) => {
    res.status(404).render('error', { 
        title: 'Page Not Found - SkillLink',
        currentPage: 'error',
        error: {
            status: 404,
            message: 'The page you are looking for does not exist.',
            description: 'You might have typed the wrong URL or the page may have been moved.'
        }
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        title: 'Server Error - SkillLink',
        currentPage: 'error',
        error: {
            status: 500,
            message: 'Internal Server Error',
            description: 'Something went wrong on our end. Please try again later.'
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 SkillLink server running on port ${PORT}`);
    console.log(`📱 Access the app at: http://localhost:${PORT}`);
    console.log(`📁 Views directory: ${path.join(__dirname, 'views')}`);
    console.log(`🎨 Static files: ${path.join(__dirname, 'public')}`);
});