// ----------------------------------------------------
// Core library imports
// ----------------------------------------------------
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// ----------------------------------------------------
// Route imports
// ----------------------------------------------------
import userRouter from "./routes/user.routes.js";

// ----------------------------------------------------
// Create Express application instance
// ----------------------------------------------------
const app = express();

/* ====================================================
   GLOBAL MIDDLEWARE CONFIGURATION
   ==================================================== */

/*
  CORS Configuration
  ------------------
  - origin: allows requests only from the frontend URL
  - credentials: allows cookies, authorization headers, etc.
*/
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

/*
  Parse incoming JSON payloads
  ----------------------------
  - limit: prevents large payload attacks
  - Required for APIs receiving JSON data
*/
app.use(express.json({ limit: "16kb" }));

/*
  Parse URL-encoded form data
  ---------------------------
  - extended: true allows nested objects
  - Used for form submissions
*/
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

/*
  Serve static files
  -----------------
  - Files inside "public" folder can be accessed directly
  - Example: images, uploads, documents
*/
app.use(express.static("public"));

/*
  Parse cookies from incoming requests
  -----------------------------------
  - Required for authentication using HTTP-only cookies
*/
app.use(cookieParser());

/* ====================================================
   ROUTES
   ==================================================== */

/*
  User routes
  -----------
  All user-related APIs are prefixed with:
  /api/v1/users

  Example:
  POST /api/v1/users/register
*/
app.use("/api/v1/users", userRouter);


//----------------------------------------------------
// Export app for server bootstrap (index.js / server.js)
// ----------------------------------------------------
export { app };



// http://localhost:8000/api/v1/users/register
