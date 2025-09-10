const mysql = require('mysql2/promise');
require('dotenv').config();

// Use mock database if no real MySQL connection available
const USE_MOCK_DB = process.env.NODE_ENV === 'development' && !process.env.DB_PASSWORD;

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'skilllink',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

let pool;

if (USE_MOCK_DB) {
    console.log('🔧 Using mock database for development');
    pool = require('./mockDatabase');
} else {
    // Create connection pool
    pool = mysql.createPool(dbConfig);
}

// Test database connection
async function testConnection() {
    try {
        if (USE_MOCK_DB) {
            console.log('✅ Mock database connected successfully');
            return true;
        }
        
        const connection = await pool.getConnection();
        console.log('✅ Database connected successfully');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        if (!USE_MOCK_DB) {
            console.log('💡 Tip: Set DB_PASSWORD in .env file or use mock database for development');
        }
        return false;
    }
}

// Initialize database and tables
async function initDatabase() {
    try {
        if (USE_MOCK_DB) {
            console.log('✅ Mock database initialized successfully');
            return true;
        }
        
        // Create database if it doesn't exist
        const connection = await mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password,
            port: dbConfig.port
        });

        await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
        await connection.end();

        // Create tables
        await createTables();
        console.log('✅ Database initialized successfully');
        return true;
    } catch (error) {
        console.error('❌ Database initialization failed:', error.message);
        return false;
    }
}

// Create necessary tables
async function createTables() {
    const connection = await pool.getConnection();
    
    try {
        // Users table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                user_type ENUM('learner', 'mentor') DEFAULT 'learner',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_email (email),
                INDEX idx_user_type (user_type)
            )
        `);

        console.log('✅ Users table created/verified');
    } finally {
        connection.release();
    }
}

module.exports = {
    pool,
    testConnection,
    initDatabase
};