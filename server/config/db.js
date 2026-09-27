const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/wasteconnect';
    
    // Attempt standard connection
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 3000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`Standard MongoDB connection failed (${error.message}). Initializing In-Memory Mongo Server for demo...`);
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      const conn = await mongoose.connect(uri);
      console.log(`In-Memory Mongo Memory Server Connected successfully at ${conn.connection.host}`);
    } catch (memErr) {
      console.error(`In-Memory Mongo error: ${memErr.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
