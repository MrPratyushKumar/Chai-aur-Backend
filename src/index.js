// require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
  path: './env'
})



connectDB()

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