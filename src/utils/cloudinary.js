// Import Cloudinary v2 and give it a clean alias
import { v2 as cloudinary } from "cloudinary";

// File system module for deleting local files
import fs from "fs";

/* ----------------------------------------------------
   CLOUDINARY CONFIGURATION
   ----------------------------------------------------
   This connects your backend server with Cloudinary
   using credentials stored in environment variables
----------------------------------------------------- */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary account name
  api_key: process.env.CLOUDINARY_API_KEY,       // Public API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Secret API key
});

/* ----------------------------------------------------
   UPLOAD FILE TO CLOUDINARY
   ----------------------------------------------------
   @param  {string} localFilePath - Path of file stored temporarily on server
   @return {object|null}          - Cloudinary response or null if failed
----------------------------------------------------- */
const uploadOnCloudinary = async (localFilePath) => {
  try {
    // STEP 1️⃣: Validate local file path
    // If file path is missing, no upload is possible
    if (!localFilePath) return null;

    // STEP 2️⃣: Upload file to Cloudinary
    // resource_type: "auto" allows images, videos, pdfs, etc.
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // STEP 3️⃣: Remove local file after successful upload
    // This prevents unnecessary disk usage on the server
    fs.unlinkSync(localFilePath);

    console.log("✅ File uploaded successfully:", response.secure_url);

    // Return Cloudinary response (contains URL, public_id, etc.)
    return response;

  } catch (error) {
    // STEP 4️⃣: Cleanup local file if upload fails
    // This avoids leftover temporary files on server
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    console.error("❌ Cloudinary upload failed:", error);
    return null;
  }
};

// Export utility function for reuse across controllers
export { uploadOnCloudinary };



// notes :

// 🧠 How This Utility Works (Flow)
// User Uploads File
//         ↓
// Multer stores file locally
//         ↓
// uploadOnCloudinary(localFilePath)
//         ↓
// Cloudinary Upload
//         ↓
// Delete Local File
//         ↓
// Return Cloudinary URL




// 🔥 Pro Tip (Interview Ready)

// If asked “How do you handle file uploads in backend?”, explain:

// “Files are first stored temporarily using Multer, uploaded to Cloudinary using a utility function, and then deleted locally to keep the server clean.”