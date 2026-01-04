// require('dotenv').config({path:'./env'})
// Load environment variables
import dotenv from "dotenv"

// Database connection
import connectDB from "./db/index.js"

// Express app instance
import { app } from "./app.js"


// Configure dotenv
dotenv.config({
  path: "./env",
})


// Define port
const PORT = process.env.PORT || 8000


// Connect to database, then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error)
    process.exit(1)
  })
 


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