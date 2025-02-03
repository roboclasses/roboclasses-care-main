import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, //60 minutes
    limit: 30,
    standardHeaders:"draft-7",
    legacyHeaders:false,
})