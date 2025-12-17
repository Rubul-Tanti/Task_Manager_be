import { Request, Response } from "express";
import { prisma } from "../../db/prisma/client";
import { ApiError } from "../../middlewares/Error";
import { otpModel } from "../../db/mongoose/otp_schema";
import Hash from "../../utils/hash"
const RegisterUser = async (req: Request, res: Response) => {
  const { email, password, name, otp } = req.body;

    if (!email || !password || !otp) {
    throw new ApiError("Email, password and OTP are required", 400);
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ApiError("User already exists", 400);
  }

  const matchOtp = await otpModel.findOne({ email });

  if (!matchOtp) {
    throw new ApiError("OTP expired or invalid", 400);
  }

  if (matchOtp.otp !== Number(otp)) {
    throw new ApiError("OTP not matched", 400);
  }
  const hashPassword=await Hash(password,12)
  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      password:hashPassword, 
    },
  });

  await otpModel.deleteOne({ email });

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: newUser,
  });
};

export default RegisterUser;
