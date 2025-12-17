import { Request, Response } from "express";
import { prisma } from "../../db/prisma/client";
import { ApiError } from "../../middlewares/Error";

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError("User id is required", 400);
  }

  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    throw new ApiError("User not found", 404);
  }

  await prisma.user.delete({
    where: { id },
  });

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
};
