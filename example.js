/**
 * Example Usage of Database Module
 * GitHub: https://github.com/jamialwasi23/IDK
 */

const Database = require('./database');

// Initialize database linked to your GitHub repo
const db = new Database('https://github.com/jamialwasi23/IDK');

// Create tables
db.createTable('users', { id: 'number', name: 'string', email: 'string' });
db.createTable('posts', { id: 'number', title: 'string', content: 'string', userId: 'number' });

// Insert sample data
const user1 = db.insert('users', { name: 'Alice', email: 'alice@example.com' });
const user2 = db.insert('users', { name: 'Bob', email: 'bob@example.com' });

db.insert('posts', { title: 'First Post', content: 'Hello World!', userId: user1.id });
db.insert('posts', { title: 'Second Post', content: 'This is awesome!', userId: user2.id });

// Query data
console.log('All Users:');
console.log(db.findAll('users'));

console.log('\nFind Bob:');
console.log(db.find('users', { name: 'Bob' }));

// Update data
console.log('\nUpdating Alice email...');
console.log(db.update('users', { name: 'Alice' }, { email: 'alice.new@example.com' }));

// Delete data
console.log('\nDeleting Bob...');
console.log(db.delete('users', { name: 'Bob' }));

// Get stats
console.log('\nDatabase Stats:');
console.log(db.getStats());

// Get GitHub info
console.log('\nRepository Info:');
console.log(db.getRepositoryInfo());

// Export data
console.log('\nExported Database:');
console.log(JSON.stringify(db.export(), null, 2));
