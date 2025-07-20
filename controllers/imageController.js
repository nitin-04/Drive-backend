import Image from "../models/Image.js";

export const getImagesByFolder = async (req, res) => {
  try {
    const { folderId } = req.params;
    // console.log("folderId:", folderId);
    // console.log("req.user._id:", req.user?._id);
    const images = await Image.find({ folder: folderId });
    // console.log("Fetched images:", images);
    res.status(200).json({ success: true, images });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch images" });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Image.findById(id);

    if (!image) return res.status(404).json({ message: "Image not found" });

    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    await Image.findByIdAndDelete(id);

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Failed to delete image" });
  }
};

export const searchImages = async (req, res) => {
  try {
    const { folderId } = req.params;
    const { query } = req.query;

    const images = await Image.find({
      folder: folderId,
      imageName: { $regex: `^${query}`, $options: "i" },
    });

    res.status(200).json({ success: true, images });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ success: false, message: "Search failed" });
  }
};
