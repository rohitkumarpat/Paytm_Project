import express from "express"
import z, { string } from "zod";
import { accountmodel, usermodel } from "../db";
import { Request,Response } from "express";
import { Router } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { middleware } from "../middleware";
import mongoose from "mongoose";

const accountrouter=express.Router();

accountrouter.get('/balance',middleware,async (req:Request,res:Response)=>{
        const money=await accountmodel.findOne({
            //@ts-ignore
            userid:req.id
        })
        res.status(200).json({
            balance:money?.balance
        })
})





accountrouter.post('/transfer',middleware,async (req:Request,res:Response)=>{
      const session=await mongoose.startSession();
      session.startTransaction();
      const {amount,to}=req.body;

      const account=await accountmodel.findOne({
        //@ts-ignore
         userid:req.id
      }).session(session)

      if(!account || (account.balance && account.balance < amount)) {
          await session.abortTransaction();
          res.status(411).json({
            msg:"insufficiant balance..1"
          })
          return;
      }

      const toaccount=await accountmodel.findOne({
        userid:to
      }).session(session);

      if(!toaccount) {
        await session.abortTransaction();
        res.status(411).json({
            msg:"insufficiant balance..."
        })
        return;
      }

      await accountmodel.updateOne({
        //@ts-ignore;
        userid:req.id
      },{
        $inc:{balance:-amount}
      }).session(session)


      await accountmodel.updateOne({
        //@ts-ignore;
        userid:to
      },{
        $inc:{balance:amount}
      }).session(session);

      await session.commitTransaction();


      res.status(200).json({
        msg:"money transfer successfully.."
      })
})





export {accountrouter}
