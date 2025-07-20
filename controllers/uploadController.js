import cloudinary from "../config/cloudinary.js";
import Image from "../models/Image.js";
import streamifier from "streamifier";

export const uploadImage = async (req, res) => {
  try {
    const { folderId, imageName } = req.body;
    const userId = req.user?._id;

    if (!req.file || !req.file.buffer) {
      return res
        .status(400)
        .json({ success: false, message: "No file provided" });
    }
    if (!imageName) {
      return res
        .status(400)
        .json({ success: false, message: "Image name is required" });
    }

    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "dobby-drive",
            resource_type: "image",
            public_id: imageName,
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );

        stream.on("error", (err) => {
          console.error("Stream error:", err);
          reject(err);
        });

        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req.file.buffer);
    // console.log("Cloudinary upload result:", result);

    const newImage = await Image.create({
      folder: folderId,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      uploadedBy: userId,
      imageName,
    });

    res.status(200).json({ success: true, image: newImage });
  } catch (error) {
    console.error("Image upload error:", error.message || error);
    res
      .status(500)
      .json({ success: false, message: "Upload failed", error: error.message });
  }
};
