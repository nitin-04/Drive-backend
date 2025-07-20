import express from "express";
import {
  getUserFolders,
  createFolder,
} from "../controllers/folderController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const folderRouter = express.Router();

folderRouter.get("/my-folders", verifyToken, getUserFolders);
folderRouter.post("/create", verifyToken, createFolder);
export default folderRouter;
