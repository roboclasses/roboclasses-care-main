import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

export const generateToken = (userId, res)=>{
    const jwtSecret = process.env.JWT_SECRET;
    if(!jwtSecret){
        console.error("ERROR: JWT_SECRET environment variable is not set!");
        throw new Error("JWT Secret not configured in environment");
    }

    const token = jwt.sign({userId}, jwtSecret, {expiresIn: "10d"});

    if(!token){
        throw new Error("JWT Token generation failed");
    }
    
    return token;
}