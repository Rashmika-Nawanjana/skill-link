-- SkillLink Database Schema
-- MySQL database initialization script

-- Create database
CREATE DATABASE IF NOT EXISTS skilllink 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE skilllink;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_type ENUM('learner', 'mentor') DEFAULT 'learner',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes for performance
    INDEX idx_email (email),
    INDEX idx_user_type (user_type),
    INDEX idx_created_at (created_at)
);

-- Sessions table (optional - for database session storage)
CREATE TABLE IF NOT EXISTS user_sessions (
    session_id VARCHAR(128) UNIQUE NOT NULL,
    expires INT(11) UNSIGNED NOT NULL,
    data MEDIUMTEXT,
    PRIMARY KEY (session_id)
);

-- Insert demo user (password: 'password')
INSERT IGNORE INTO users (first_name, last_name, email, password_hash, user_type) 
VALUES (
    'Demo', 
    'User', 
    'demo@skilllink.com', 
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewLhFP1ZzpXvdPGa', -- bcrypt hash for 'password'
    'learner'
);

-- Display success message
SELECT 'SkillLink database initialized successfully!' AS message;