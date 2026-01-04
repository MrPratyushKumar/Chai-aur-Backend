// Import core libraries
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Create an Express application instance
const app = express();

/*
  CORS configuration:
  - origin: allows requests only from trusted frontend URL
  - credentials: true allows cookies, authorization headers, etc.
*/
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

/*
  Parse incoming JSON payloads
  - limit prevents large payload attacks
*/
app.use(express.json({ limit: "16kb" }));

/*
  Parse URL-encoded data (form submissions)
  - extended: true allows nested objects
*/
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

/*
  Serve static files from "public" directory
  - Used for images, uploads, documents, etc.
*/
app.use(express.static("public"));

/*
  Parse cookies from incoming requests
  - Required for authentication using HTTP-only cookies
*/
app.use(cookieParser());

// Export app to be used in server.js or index.js
export { app };
