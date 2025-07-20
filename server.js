import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import folderRouter from "./routes/folderRoutes.js";
import uploadRouter from "./routes/uploadRouter.js";
import imageRoutes from "./routes/imageRoutes.js";

connectDB();

const app = express();

app.use(express.json());

app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://drive-web.vercel.app",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRouter);
app.use("/api/folder", folderRouter);
app.use("/api/upload", uploadRouter);
app.use("/api", imageRoutes);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export const handler = serverless(app);
