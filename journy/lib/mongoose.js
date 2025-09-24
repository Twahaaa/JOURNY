import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDb() {
  if (cached.conn) {
    console.log('Using cached database connection.'); // Optional: for debugging
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Creating new database connection.'); // Optional: for debugging
    
    // The key is adding robust options here
    const opts = {
      bufferCommands: false,
      // --- Add these settings for a stable connection ---
      // retryWrites: true,
      // keepAlive: true,
      // keepAliveInitialDelay: 180000, // 3 minutes
      serverSelectionTimeoutMS: 5000, // 5 seconds to find a server
      socketTimeoutMS: 45000, // 45 seconds before a socket times out
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDb;