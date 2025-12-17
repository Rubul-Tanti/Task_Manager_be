import { Request, Response } from "express";
import { prisma } from "../../db/prisma/client";
import { ApiError } from "../../middlewares/Error";
import Hash from "../../utils/hash";

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, password } = req.body;

  if (!id) {
    throw new ApiError("User id is required", 400);
  }

  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    throw new ApiError("User not found", 404);
  }

  let updatedData: any = {};

  if (name) updatedData.name = name;

  if (password) {
    updatedData.password = await Hash(password, 12);
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: updatedData,
    select: {
      id: true,
      email: true,
      name: true,
      updatedAt: true,
    },
  });

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: updatedUser,
  });
};
