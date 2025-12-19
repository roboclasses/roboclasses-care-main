import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const auth = req.headers["authorization"];
  console.log(auth);

  if (!auth) {
    return res.status(403).json({ success: false, message: "JWT token is required" });
  }

  const token =auth.startsWith("Bearer ") ?  auth.split(" ")[1] : auth;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded);
    
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ success: false, message: "JWT token is wrong or expired" });
  }
};
