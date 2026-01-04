import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/*
  User Schema:
  - Represents application users
  - Handles authentication and profile data
*/
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    avatar: {
      type: String,
      required: true,
    },

    coverImage: {
      type: String,
    },

    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],

    // Hashed password
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    // Refresh token (stored for logout / rotation)
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

/*
  Pre-save hook:
  - Hash password before saving
  - Runs only if password is modified
*/
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Hash password with salt rounds = 10
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/*
  Compare plain password with hashed password
*/
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

/*
  Generate Access Token (short-lived)
*/
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

/*
  Generate Refresh Token (long-lived)
*/
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

// Export User model
export const User = mongoose.model("User", userSchema);



// notes:

// 🧠 Why These Things Matter (Conceptually)
// 🔐 Why hash in pre("save")?

// Guarantees no plain password ever reaches DB

// Centralized security

// Impossible to forget hashing in controllers



// 🔑 Why Access vs Refresh Tokens?
// Token |	Purpose	| Lifetime
// AccessToken	API access	Short (minutes)
// Refresh Token	Get new access token	Long (days)


// 🎯 Interview-Ready Explanation

// “We hash passwords using a pre-save hook to guarantee security at the model level, and we generate short-lived access tokens with long-lived refresh tokens to balance security and user experience.”