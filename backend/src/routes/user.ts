import express from "express"
import z, { string } from "zod";
import { accountmodel, usermodel } from "../db";
import { Request,Response } from "express";
import { Router } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { middleware } from "../middleware";

const userrouter=express.Router();

userrouter.post("/signup",async (req:Request,res:Response)=>{
     const requiredbody=z.object({
        username:z.string().min(4).max(30).email(),
        password:z.string().min(2).max(30),
        firstName:z.string().min(2).max(20),
        lastName:z.string().min(2)
    })


    const passedwithsucces=requiredbody.safeParse(req.body);
     if(!passedwithsucces) {
       res.status(400).json({
        msg:"invalid credential.."
       })
       return;
    }
    
    const existinguser=await usermodel.findOne({
      username:req.body.username
    })
    
    if(existinguser) {
       res.status(411).json({
        msg:"username is already used.."
      })
      return;
    }

        const {username,password,firstName,lastName}=req.body;
        const hashpassword=await bcrypt.hash(password,5);

    const user=await usermodel.create({

        username:username,
        password: hashpassword,
        firstName: firstName,
        lastName: lastName,

    })

    await accountmodel.create({
      //@ts-ignore
      userid:user._id,
      balance:1+Math.random()*10000
    })

    res.status(200).json({
      msg:"your account is created"
    })


})

userrouter.post("/signin",async (req:Request,res:Response)=>{
    const {username,password}=req.body;

    const user=await usermodel.findOne({
      username:username,
    })

    if(!user) {
       res.status(411).json({
        msg:"cant find the user"
       })
       return;
    }

    const passwordmatch=await bcrypt.compare(password,user.password as string);
    if(!passwordmatch) {
      res.status(411).json({
        msg:"plzz enter the correct password"
      })
      return;
    }

     
    
    else {
    const token=jwt.sign({
      id:user._id
    },JWT_SECRET)
    
    res.status(200).json({
      token:token
    })
  } 
})



userrouter.put("/",middleware,async (req:Request,res:Response)=>{
         const updatebody=z.object({
          username:z.string().min(4).max(30).email().optional(),
        password:z.string().min(4).max(30).optional(),
        firstName:z.string().min(3).max(20).optional(),
        lastName:z.string().min(2).optional()
         })

          const success=updatebody.safeParse(req.body);
     if(!success) {
       res.status(400).json({
        msg:"invalid credential.."
       })
       return;
    }

    const user1=await usermodel.findOne({
      //@ts-ignore
      _id:req.id
    },req.body)
    
    

    res.status(200).json({
      msg:"update successfully"
    })
})





userrouter.get("/bulk", middleware, async (req: Request, res: Response) => {
  const filter = req.query.filter || "";
  
  const users = await usermodel.find({
    $or: [
      { firstName: { $regex: filter, $options: 'i' } },
      { lastName: { $regex: filter, $options: 'i' } }
    ]
  });

  res.status(200).json({
    users: users.map((user) => ({
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    }))
  });
});


export  {userrouter}