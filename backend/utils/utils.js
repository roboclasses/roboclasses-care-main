import jwt from "jsonwebtoken";

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
    
    res.cookie("token", token,  {
        httpOnly: true,
        path: "/",
        maxAge: 10 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
    });
   
    return token;
}