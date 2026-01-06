// ----------------------------------------------------
// Import Router from Express
// ----------------------------------------------------
import { Router } from "express";

// ----------------------------------------------------
// Import Controllers & Middlewares
// ----------------------------------------------------
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

// ----------------------------------------------------
// Create Router Instance
// ----------------------------------------------------
const router = Router();

/*
|--------------------------------------------------------------------------
| User Registration Route
|--------------------------------------------------------------------------
| Method   : POST
| Endpoint : /api/v1/users/register
|
| Flow:
| 1. Client sends form-data (text + files)
| 2. Multer middleware processes uploaded files
| 3. registerUser controller handles business logic
|
| Accepted Files:
| - avatar     (single image)
| - coverImage (single image)
*/
router.post(
  "/register",

  // Multer middleware runs BEFORE controller
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage", // ✅ typo fixed (coerImage → coverImage)
      maxCount: 1,
    },
  ]),

  // Controller executes AFTER files are processed
  registerUser
);

/*
|--------------------------------------------------------------------------
| Route Mounting Info
|--------------------------------------------------------------------------
| app.use("/api/v1/users", userRouter);
|
| Final Endpoint:
| POST http://localhost:8000/api/v1/users/register
|--------------------------------------------------------------------------
*/

// ----------------------------------------------------
// Export Router
// ----------------------------------------------------
export default router;
