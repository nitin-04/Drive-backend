import express from "express";
import upload from "../middlewares/multer.js";
import { uploadImage } from "../controllers/uploadController.js";
import {
  deleteImage,
  getImagesByFolder,
  searchImages,
} from "../controllers/imageController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const imageRoutes = express.Router();

imageRoutes.post("/upload", verifyToken, upload.single("image"), uploadImage);
imageRoutes.get("/images/:folderId", verifyToken, getImagesByFolder);
imageRoutes.delete("/images/:id", verifyToken, deleteImage);
imageRoutes.get("/images/:folderId/search", verifyToken, searchImages);

export default imageRoutes;
