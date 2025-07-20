import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imageName: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Image", imageSchema);
