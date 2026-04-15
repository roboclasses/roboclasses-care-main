import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const authMiddleware = async(req, res, next) => {
  // Check Authorization header first (header format: "Bearer <token>")
  let token = null;
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.slice(7); // Remove "Bearer " prefix
  } else {
    // Fallback to cookie for backward compatibility
    token = req.cookies.token;
  }

  if(!token){
    return res.status(401).json({success: false, message: "Unauthorized - Token is required"})
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if(!user){
      return res.status(404).json({success: false, message: "Unauthorized - User not found"})
    }
    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ success: false, message: "Forbidden - JWT token is wrong or expired" });
  }
};
