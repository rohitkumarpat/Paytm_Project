import { NextFunction,Request,Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";

export const middleware=(req:Request,res:Response,next:NextFunction)=>{
    const token=req.headers.token;
    const decode=jwt.verify(token as  string,JWT_SECRET);

    if(decode) {
        //@ts-ignore
        req.id=decode.id
        next();
    }
    else {
        res.status(411).json({
            msg:"you r not sign in.."
        })
    }
}