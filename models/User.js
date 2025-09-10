const { pool } = require('../config/database');
const { hashPassword, comparePassword, isValidEmail, isValidPassword } = require('../utils/auth');

class User {
    constructor(data) {
        this.id = data.id;
        this.firstName = data.first_name;
        this.lastName = data.last_name;
        this.email = data.email;
        this.userType = data.user_type;
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
    }

    // Create a new user
    static async create(userData) {
        const { firstName, lastName, email, password, userType = 'learner' } = userData;

        // Validation
        if (!firstName || !lastName || !email || !password) {
            throw new Error('All fields are required');
        }

        if (!isValidEmail(email)) {
            throw new Error('Invalid email format');
        }

        if (!isValidPassword(password)) {
            throw new Error('Password must be at least 8 characters long');
        }

        // Check if user already exists
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Hash password
        const passwordHash = await hashPassword(password);

        // Insert user
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.execute(
                'INSERT INTO users (first_name, last_name, email, password_hash, user_type) VALUES (?, ?, ?, ?, ?)',
                [firstName, lastName, email, passwordHash, userType]
            );

            // Return created user (without password)
            return await User.findById(result.insertId);
        } finally {
            connection.release();
        }
    }

    // Find user by ID
    static async findById(id) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                'SELECT * FROM users WHERE id = ?',
                [id]
            );

            if (rows.length === 0) {
                return null;
            }

            return new User(rows[0]);
        } finally {
            connection.release();
        }
    }

    // Find user by email
    static async findByEmail(email) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );

            if (rows.length === 0) {
                return null;
            }

            return new User(rows[0]);
        } finally {
            connection.release();
        }
    }

    // Authenticate user
    static async authenticate(email, password) {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );

            if (rows.length === 0) {
                throw new Error('Invalid email or password');
            }

            const user = rows[0];
            const isValidPassword = await comparePassword(password, user.password_hash);

            if (!isValidPassword) {
                throw new Error('Invalid email or password');
            }

            return new User(user);
        } finally {
            connection.release();
        }
    }

    // Get user's full name
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    // Convert to JSON (excluding sensitive data)
    toJSON() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            userType: this.userType,
            fullName: this.fullName,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = User;