// Mock MySQL database for testing without real MySQL server
const mockUsers = new Map();
let nextId = 1;

// Initialize with demo user for testing
const bcrypt = require('bcryptjs');

async function initializeDemoUser() {
    const passwordHash = await bcrypt.hash('password', 12);
    const demoUser = {
        id: nextId++,
        first_name: 'Demo',
        last_name: 'User',
        email: 'demo@skilllink.com',
        password_hash: passwordHash,
        user_type: 'learner',
        created_at: new Date(),
        updated_at: new Date()
    };
    mockUsers.set(demoUser.id, demoUser);
    console.log('Demo user created with email: demo@skilllink.com');
}

// Initialize demo user
initializeDemoUser().catch(console.error);

const mockDatabase = {
    // Mock connection pool
    async getConnection() {
        return {
            async execute(query, params = []) {
                console.log('Mock query:', query, params);
                
                if (query.includes('CREATE DATABASE')) {
                    return [{ affectedRows: 1 }];
                }
                
                if (query.includes('CREATE TABLE')) {
                    return [{ affectedRows: 1 }];
                }
                
                if (query.includes('INSERT INTO users')) {
                    const [firstName, lastName, email, passwordHash, userType] = params;
                    const id = nextId++;
                    const user = {
                        id,
                        first_name: firstName,
                        last_name: lastName,
                        email,
                        password_hash: passwordHash,
                        user_type: userType,
                        created_at: new Date(),
                        updated_at: new Date()
                    };
                    mockUsers.set(id, user);
                    return [{ insertId: id }];
                }
                
                if (query.includes('SELECT * FROM users WHERE email')) {
                    const email = params[0];
                    const user = Array.from(mockUsers.values()).find(u => u.email === email);
                    return [user ? [user] : []];
                }
                
                if (query.includes('SELECT * FROM users WHERE id')) {
                    const id = params[0];
                    const user = mockUsers.get(id);
                    return [user ? [user] : []];
                }
                
                return [[]];
            },
            release() {
                // Mock release
            }
        };
    }
};

module.exports = mockDatabase;