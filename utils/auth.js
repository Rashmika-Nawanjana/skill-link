const bcrypt = require('bcryptjs');

// Hash password utility
async function hashPassword(password) {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
}

// Compare password utility
async function comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate password strength
function isValidPassword(password) {
    // At least 8 characters
    return password && password.length >= 8;
}

module.exports = {
    hashPassword,
    comparePassword,
    isValidEmail,
    isValidPassword
};