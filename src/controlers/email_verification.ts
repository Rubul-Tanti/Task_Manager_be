
import {Request,Response} from 'express'
import { EmailService } from '../services/send_email'
import GenerateOtp from '../utils/generate_otp'
import  { otpModel } from "../db/mongoose/otp_schema"
import { ApiError } from '../middlewares/Error'
const email_verifation=async(req:Request,res:Response)=>{
    try{ 
        const {email}=req.body
        if(!email){return res.status(400).json({message:"email required",success:false})}
        const otp=GenerateOtp(6)
        const EmailRes=await EmailService.sendOtp(email,otp)
        await otpModel.deleteMany({ email });
        await otpModel.create({otp,email})
        res.status(200).json({success:true})
    }catch(e){  
            new ApiError('internal server Error',500)
    }
}
export default email_verifation