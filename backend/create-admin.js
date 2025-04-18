// create-admin.js
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Log the MongoDB URI (remove password for security)
const connectionString = process.env.MONGO_URI || 'mongodb://localhost:27017/rayane-db';
console.log('Connecting to MongoDB at:', connectionString.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));

// Create a User model for this script
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'editor'],
    default: 'editor'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

async function createAdminUser() {
  let connection;
  try {
    console.log('Attempting to connect to MongoDB...');
    
    // Set connection options with timeout
    const options = {
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
      connectTimeoutMS: 10000 // 10 seconds connection timeout
    };
    
    // Connect to MongoDB
    connection = await mongoose.connect(connectionString, options);
    console.log('Connected to MongoDB successfully');

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ username: 'admin' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      return mongoose.connection.close();
    }

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    const adminUser = new User({
      username: 'admin',
      password: hashedPassword,
      role: 'admin'
    });
    
    await adminUser.save();
    console.log('Admin user created successfully');
    console.log('Username: admin');
    console.log('Password: admin123');
  } catch (error) {
    console.error('Error details:');
    console.error('- Error name:', error.name);
    console.error('- Error message:', error.message);
    console.error('- Connection string used (redacted):', connectionString.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));
    
    if (error.name === 'MongooseServerSelectionError') {
      console.log('\nPossible solutions:');
      console.log('1. Make sure MongoDB is installed and running');
      console.log('2. Try using a different connection string in your .env file:');
      console.log('   - MONGO_URI=mongodb://0.0.0.0:27017/rayane-db');
      console.log('   - MONGO_URI=mongodb://host.docker.internal:27017/rayane-db');
      console.log('3. Consider using MongoDB Atlas (cloud version)');
    }
  } finally {
    // Close the connection if it was established
    if (connection) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    }
  }
}

createAdminUser();