const mongoose = require('mongoose');

const connectDB = async () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/wasteconnect';

  try {
    // Attempt standard connection
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);

    if (isProduction || process.env.MONGODB_URI) {
      console.error('Fatal: Production MongoDB connection failed. Please verify MONGODB_URI credentials in Render Environment Settings.');
      process.exit(1);
    }

    console.warn('Initializing In-Memory Mongo Server for local development fallback...');
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
