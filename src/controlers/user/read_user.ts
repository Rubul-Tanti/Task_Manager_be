import { Request, Response } from "express";
import { prisma } from "../../db/prisma/client";
import { ApiError } from "../../middlewares/Error";

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError("User id is required", 400);
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  res.status(200).json({
    success: true,
    data: user,
  });
};
