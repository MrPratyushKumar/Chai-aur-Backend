// Load environment variables from .env file
import dotenv from "dotenv";

// Import database connection function
import connectDB from "./db/index.js";

// Import configured Express app
import { app } from "./app.js";

/*
  Configure dotenv:
  - Loads environment variables into process.env
  - Must be called BEFORE using any env variables
*/
dotenv.config({
  path: "./env",
});

/*
  Define server port:
  - Use PORT from environment if available
  - Fallback to 8000 for local development
*/
const PORT = process.env.PORT || 8000;

/*
  Step 1: Connect to the database
  Step 2: Start the Express server ONLY after DB connection succeeds

  This ensures:
  - App does not start without DB
  - Prevents runtime crashes
*/
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    // Log database connection error
    console.error("❌ MongoDB connection failed:", error);

    // Exit process with failure code
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