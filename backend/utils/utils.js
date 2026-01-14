import jwt from "jsonwebtoken";

export const generateToken = (userId, res)=>{
    const jwtSecret = process.env.JWT_SECRET;
    if(!jwtSecret){
        throw new Error("JWT Secret not found");
    }

    const token = jwt.sign({userId}, jwtSecret, {expiresIn: "10d"});

    if(!token){
        throw new Error("JWT Token not found");
    }
    
    res.cookie("token", token,  {
        httpOnly: true,
        path: "/",
        maxAge: 10 * 24 * 60 * 60 * 1000,
        // secure: process.env.NODE_ENV === 'production',
        secure: true,
        sameSite: "none",
    });
   
    return token;
}