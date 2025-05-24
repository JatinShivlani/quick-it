// this file is used to initialize the database connection
import mongoose from "mongoose";

let cached = global.mongoose; 

if(!cached){
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
if (cached.conn) {
  console.log("Using cached database connection",cached.conn);
    return cached.conn;
  } 
  if(!cached.promise){
    const opts = {
        bufferCommands: false,
    };
    cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/quickit`, opts).then((mongoose) => {
      console.log("New database connection established",mongoose);
        return mongoose;
    });
  }
  cached.conn = await cached.promise;
  console.log("Database connection established",cached.conn);
  return cached.conn;
}

export default connectDB;