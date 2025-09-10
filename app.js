const express = require('express');
const path = require('path');
const session = require('express-session');
const { testConnection, initDatabase } = require('./config/database');
require('dotenv').config();

const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// User authentication middleware (make user available in all templates)
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.isAuthenticated = !!req.session.user;
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/mentors', require('./routes/mentors'));
app.use('/learners', require('./routes/learners'));

// 404 handler
app.use((req, res) => {
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

// Initialize database and start server
async function startServer() {
  try {
    // Test database connection
    await testConnection();
    
    // Initialize database (create tables if they don't exist)
    await initDatabase();
    
    // Start server
    if (require.main === module) {
      app.listen(PORT, () => {
        console.log(`SkillLink server running on http://localhost:${PORT}`);
      });
    }
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

// Local development only
if (require.main === module) {
  startServer();
}

module.exports = app;