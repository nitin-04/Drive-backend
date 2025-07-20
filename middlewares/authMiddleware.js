import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ success: false, message: "Invalid token" });
  }
};
