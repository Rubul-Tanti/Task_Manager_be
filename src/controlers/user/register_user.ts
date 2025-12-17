import {Request,Response}from "express"
import { prisma } from "../../db/prisma/client"
import { ApiError } from "../../middlewares/Error";
import { otpModel } from "../../db/mongoose/otp_schema";
const RegisterUser=async(req:Request,res:Response)=>{
  try{

    const {email,password,name,otp}=req.body
    if(!otp){return res.status(403).json({message:'otp cannot be empty'})}
    const existingUser = await prisma.user.findUnique({
    where: { email },
  });
    const matchOtp=await otpModel.findOne({email})
    if(!matchOtp){
      throw new ApiError('otp expired',400)
    } 
    if(email!==matchOtp.email){
      throw new ApiError('different email not allowed',403)
    }
    if(matchOtp.otp!==Number(otp)){
      throw new ApiError('otp not matched',400)
    }

  if (existingUser) {
    throw new ApiError("User already exists", 400);
  }
  
  const newUser=await prisma.user.create({data:{email,name,password}})
  res.status(201).json({success:true,message:'created user',data:newUser})
  
}catch(e){
  new ApiError('internal error',500)
}
}
export default RegisterUser