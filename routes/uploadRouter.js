import express from "express";
import upload from "../middlewares/multer.js";
import { uploadImage } from "../controllers/uploadController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const uploadRouter = express.Router();

uploadRouter.post("/upload", verifyToken, upload.single("image"), uploadImage);

export default uploadRouter;
