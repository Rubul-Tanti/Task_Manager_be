import { Request, Response } from "express";
import { prisma } from "../../db/prisma/client";
import { ApiError } from "../../middlewares/Error";
import bcrypt from "bcrypt"
import { signAccessToken, signRefreshToken } from "../../utils/jwt";

const LoginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    throw new ApiError("Email and password are required", 400);
  }

  // find user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError("Invalid email or password", 401);
  }
  console.log(user.password)
  console.log(password)
  // compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError("Invalid email or password", 401);
  }

  // generate tokens
  const accessToken = signAccessToken({
    userId: user.id,
    email: user.email,
  });

  const refreshToken = signRefreshToken({
    userId: user.id,
  });

  // response (never send password)
  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      accessToken,
      refreshToken,
    },
  });
};

export default LoginUser;
