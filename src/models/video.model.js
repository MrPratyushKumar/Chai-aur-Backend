import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

/*
  Video Schema:
  - Represents uploaded videos
  - Supports pagination using aggregation
*/
const videoSchema = new Schema(
  {
    // Video file URL (Cloudinary)
    videoFile: {
      type: String,
      required: [true, "Video file is required"],
    },

    // Thumbnail image URL
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"],
    },

    // Video title
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    // Video description
    description: {
      type: String,
      required: [true, "Description is required"],
    },

    // Duration in seconds (from Cloudinary metadata)
    duration: {
      type: Number,
      required: [true, "Duration is required"],
    },

    // Total views count
    views: {
      type: Number,
      default: 0,
    },

    // Publish status
    isPublished: {
      type: Boolean,
      default: true,
    },

    // Video owner (creator)
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    // Automatically adds createdAt and updatedAt
    timestamps: true,
  }
);

// Enable aggregation pagination
videoSchema.plugin(mongooseAggregatePaginate);

// Export Video model
export const Video = mongoose.model("Video", videoSchema);



// notes :

// 🎯 Interview-Ready Explanation

// “We use aggregation pagination for scalable video feeds, reference the User model for ownership, and track publish status and timestamps to support analytics and visibility control.”