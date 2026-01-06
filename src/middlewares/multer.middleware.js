import multer from "multer";
import path from "path";

/**
 * Multer Disk Storage Configuration
 * - Controls where files are stored
 * - Controls how files are named
 */
const storage = multer.diskStorage({

  /**
   * Destination:
   * Defines the folder where uploaded files will be stored
   */
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },

  /**
   * Filename:
   * Defines the name of the uploaded file
   * Using timestamp to avoid file name collisions
   */
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    const ext = path.extname(file.originalname);

    cb(null, `${uniqueName}${ext}`);
  }
});

/**
 * Multer Upload Middleware
 * - storage: file storage configuration
 * - limits: optional file size limits
 */
export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB limit
  }
});



// 🔥 Interview-Ready One-Line Explanation

// “Multer is a middleware used to handle multipart/form-data in Node.js, mainly for file uploads, and diskStorage allows us to control file destination and naming.”