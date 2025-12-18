import { prisma } from '../../db/prisma/client';
import { ApiError } from '../../middlewares/Error';
import { Request, Response } from 'express';

const RegisterOrg = async (req: Request, res: Response) => {
  try {
    const { name, description, ownerId } = req.body;

    if (!name || !description || !ownerId) {
      throw new ApiError('Enter all fields: name, description, ownerId', 403);
    }

    const newOrg = await prisma.organization.create({
      data: { name, description, ownerId }
    });

    res.status(201).json({
      message: "Organization registered successfully",
      success: true,
      data: newOrg
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

export default RegisterOrg;
