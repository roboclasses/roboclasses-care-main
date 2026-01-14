import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const authMiddleware = async(req, res, next) => {
  const token = req.cookies.token;
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
