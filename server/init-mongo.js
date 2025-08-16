// MongoDB initialization script
db = db.getSiblingDB('brainity');

// Create user for the application
db.createUser({
  user: 'brainity_user',
  pwd: 'brainity_password',
  roles: [
    {
      role: 'readWrite',
      db: 'brainity'
    }
  ]
});

// Create collections
db.createCollection('users');
db.createCollection('courses');
db.createCollection('sections');
db.createCollection('lessons');
db.createCollection('categories');
db.createCollection('blogs');
db.createCollection('ratings');
db.createCollection('carts');
db.createCollection('purchases');
db.createCollection('notifications');
db.createCollection('teacherRequests');
db.createCollection('userChapterProgress');

print('MongoDB initialized successfully'); 