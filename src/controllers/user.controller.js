// ----------------------------------------------------
// Import asyncHandler utility
// ----------------------------------------------------
// This wrapper handles errors in async controllers
// and forwards them to the global error handler
import { asyncHandler } from "../utils/asyncHandler.js";

/*
  Register User Controller
  ------------------------
  - Handles user registration requests
  - Wrapped inside asyncHandler to avoid try-catch
  - Endpoint: POST /api/v1/users/register
*/
const registerUser = asyncHandler(async (req, res) => {
  // Temporary response to verify route & controller are working

  // 🔍 Log request headers
  console.log("Headers received:", req.headers);
  
  // 🔍 Access specific header
  console.log("Content-Type:", req.headers["content-type"]);

  // 🔍 Request body
  console.log("Request body:", req.body);
  res.status(200).json({
    success: true,
    message: "Register API is working",
  });
});

// ----------------------------------------------------
// Export controller function
// ----------------------------------------------------
export { registerUser };
