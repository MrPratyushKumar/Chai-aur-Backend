// ----------------------------------------------------
// Load environment variables from .env file
// ----------------------------------------------------
import dotenv from "dotenv";

// Database connection function
import connectDB from "./db/index.js";

// Pre-configured Express application
import { app } from "./app.js";

/*
  Load environment variables into process.env

  ⚠️ IMPORTANT:
  This must be executed BEFORE accessing any
  environment variables (process.env.*)
*/
dotenv.config({
  path: "./env",
});

// ----------------------------------------------------
// Server Configuration
// ----------------------------------------------------

// Use PORT from environment variables
// Fallback to 8000 for local development
const PORT = process.env.PORT || 8000;

/*
  Application Bootstrap Flow
  --------------------------
  1️⃣ Connect to MongoDB
  2️⃣ Start Express server ONLY after DB connection succeeds

  Why this approach?
  - Prevents server from running without database access
  - Avoids runtime crashes caused by missing DB connection
*/
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `🚀 Server started successfully at http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    /*
      Handle database connection failure

      - Log detailed error
      - Exit process with non-zero code
      - Prevents app from running in broken state
    */
    console.error("❌ MongoDB connection failed:", error);

    process.exit(1);
  });

// Real Production Flow:
//   dotenv → load env
// ↓
// connectDB → connect MongoDB
// ↓
// app.listen → start server
// ↓
// ready to accept requests


// 🏆 Interview Tip (FAANG-Style Answer)

// Q: Why do you start the server only after DB connection?
// A:

// “To ensure the application doesn’t accept requests without


/*
import express from "express"
const app = express()
//EFI function -> emmediate execute kar do || ;-> use before cleaning process -> agen prani line pe semicolumn nhi lagaya hai to us problem se bachne ke 
// liye


;(async() => {
  try{
    await mongoose.connect(`${process.env.MONGODB_URI}/{DB_NAME}`)
    app.on("error" , (error)=>{
      console.log("Our Application is not able to talk to due to this: " ,error);
      throw error
    })
    app.listen(process.env.PORT, ()=> {
      console.log(`App is Listening on port ${process.env.PORT}`)
    })
  } catch (error){
    console.error("ERROR: " , error)
    throw error
  }
})()
  */