// ----------------------------------------------------
// Import Router from Express
// ----------------------------------------------------
import { Router } from "express";

// Import controller function for user registration
import { registerUser } from "../controllers/user.controller.js";

// ----------------------------------------------------
// Create a new router instance
// ----------------------------------------------------
const router = Router();

/*
  User Registration Route
  -----------------------
  HTTP Method : POST
  Endpoint    : /api/v1/users/register

  Flow:
  - Client sends user registration data
  - Request is forwarded to registerUser controller
*/
router.route("/register").post(registerUser);

/*
  NOTE:
  This route is mounted in app.js like this:

  app.use("/api/v1/users", userRouter);

  Final URL becomes:
  POST http://localhost:8000/api/v1/users/register
*/

// ----------------------------------------------------
// Export router to be used in app.js
// ----------------------------------------------------
export default router;
