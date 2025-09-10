// Authentication middleware for protecting routes

// Middleware to require authentication
function requireAuth(req, res, next) {
    if (req.session && req.session.user) {
        return next(); // User is authenticated
    } else {
        // Store the original URL for redirect after login
        req.session.returnTo = req.originalUrl;
        return res.redirect('/learners/login');
    }
}

// Middleware to require specific user types
function requireUserType(userType) {
    return function(req, res, next) {
        if (req.session && req.session.user) {
            if (req.session.user.userType === userType) {
                return next();
            } else {
                return res.status(403).render('error', {
                    title: 'Access Denied - SkillLink',
                    currentPage: 'error',
                    error: {
                        status: 403,
                        message: 'Access Denied',
                        description: `This page is only accessible to ${userType}s.`
                    }
                });
            }
        } else {
            req.session.returnTo = req.originalUrl;
            return res.redirect('/learners/login');
        }
    };
}

// Middleware to redirect authenticated users away from auth pages
function redirectIfAuth(req, res, next) {
    if (req.session && req.session.user) {
        return res.redirect('/');
    } else {
        return next();
    }
}

module.exports = {
    requireAuth,
    requireUserType,
    redirectIfAuth
};