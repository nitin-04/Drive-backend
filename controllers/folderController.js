import Folder from "../models/Folder.js";

export const getUserFolders = async (req, res) => {
  try {
    const userId = req.user._id;
    const parent = req.query.parent === "" ? null : req.query.parent;

    const folders = await Folder.find({ createdBy: userId, parent });
    res.status(200).json({ success: true, folders });
  } catch (error) {
    console.error("getUserFolders error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createFolder = async (req, res) => {
  try {
    const { name, parent = null } = req.body;
    if (!name)
      return res
        .status(400)
        .json({ success: false, message: "Folder name is required" });

    const folder = await Folder.create({
      name,
      createdBy: req.user._id,
      parent,
    });

    res.status(201).json({ success: true, folder });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
