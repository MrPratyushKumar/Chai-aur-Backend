// Import mongoose for MongoDB connection
import mongoose from "mongoose";

// Import database name constant
import { DB_NAME } from "../constants.js";

/*
  connectDB:
  - Establishes connection with MongoDB using Mongoose
  - Should be called before starting the Express server
*/
const connectDB = async () => {
  try {
    /*
      mongoose.connect() returns a connection instance
      which contains useful information about the DB connection
    */
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    // Log successful connection with DB host information
    console.log(
      `\n✅ MongoDB connected successfully! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    // Log connection error
    console.error("❌ MongoDB connection error:", error);

    // Exit the process if DB connection fails
    process.exit(1);
  }
};

// Export the function for use in server startup
export default connectDB;
