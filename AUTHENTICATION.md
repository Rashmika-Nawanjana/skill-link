# SkillLink Authentication & Database Setup

## Overview
SkillLink now includes full authentication functionality with MySQL database support. Users can register, login, and maintain secure sessions.

## Features Added
- ✅ User registration with password hashing (bcrypt)
- ✅ Secure login with session management
- ✅ MySQL database integration with connection pooling
- ✅ Mock database for development/testing
- ✅ Input validation and error handling
- ✅ Session-based authentication middleware
- ✅ Logout functionality
- ✅ Environment configuration support

## Database Setup

### Option 1: Using MySQL (Production)
1. Install MySQL server
2. Create a database user for SkillLink
3. Copy `.env.example` to `.env` and configure your database settings:
   ```bash
   cp .env.example .env
   ```
4. Update the database configuration in `.env`:
   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=skilllink
   DB_PORT=3306
   SESSION_SECRET=your_secure_session_secret
   ```
5. Initialize the database:
   ```bash
   mysql -u your_user -p < database/init.sql
   ```

### Option 2: Using Mock Database (Development)
For development/testing without MySQL:
1. Leave `DB_PASSWORD` empty in `.env`
2. The application will automatically use the mock database
3. A demo user is created: `demo@skilllink.com` / `password`

## Installation & Running

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the application:
   ```bash
   npm start
   ```

3. Visit http://localhost:3000

## Authentication Features

### User Registration
- Navigate to `/learners/signup`
- Fill out the registration form
- Passwords are automatically hashed using bcrypt
- Users are logged in immediately after registration

### User Login
- Navigate to `/learners/login`
- Use demo credentials: `demo@skilllink.com` / `password`
- Or use any registered user credentials
- Session-based authentication with configurable expiration

### Security Features
- Password hashing with bcrypt (12 salt rounds)
- Session management with secure cookies
- Input validation (email format, password length)
- Protection against duplicate email registration
- Secure session secret configuration

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_type ENUM('learner', 'mentor') DEFAULT 'learner',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Environment Variables

Required environment variables in `.env`:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=skilllink
DB_PORT=3306

# Session Configuration
SESSION_SECRET=your_super_secret_session_key

# Application Configuration
NODE_ENV=development
PORT=3000
```

## API Endpoints

### Authentication Routes
- `GET /learners/signup` - Registration page
- `POST /learners/signup` - Handle user registration
- `GET /learners/login` - Login page
- `POST /learners/login` - Handle user login
- `GET /learners/logout` - Logout user
- `POST /learners/logout` - Logout user (POST)

## Development Notes

- The application uses a mock database when `DB_PASSWORD` is empty
- Session data is stored in memory (configure external session store for production)
- All passwords are hashed with bcrypt before storage
- The application includes comprehensive error handling and validation
- Authentication state is available in all templates via middleware

## Testing

Demo user credentials (available in both mock and real database):
- **Email:** demo@skilllink.com
- **Password:** password

## Next Steps

For production deployment:
1. Set up a production MySQL database
2. Configure environment variables for production
3. Set up external session storage (Redis recommended)
4. Enable HTTPS and set secure cookie flags
5. Implement rate limiting for authentication endpoints