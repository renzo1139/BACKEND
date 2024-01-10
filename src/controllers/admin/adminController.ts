import { Request, Response } from "express";
import { prismaClient } from "../../routes/index.routes";
import { errorMessage, successfullyMessage } from "../functions/functions";

export const getAllAdmins = async (_req: Request, res: Response) => {
  try {
    const admins = await prismaClient.admin.findMany();
    res.send(admins);
  } catch (error) {
    errorMessage(res, error);
  }
};

export const getAdminByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const adminFounded = await prismaClient.admin.findFirst({
      where: {
        id: Number(id),
      },
    });
    res.send(adminFounded);
  } catch (error) {
    errorMessage(res, error);
  }
};

export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const { id } = req.params;

    const userUpdated = await prismaClient.user.update({
      where: {
        id: Number(id),
      },
      data,
    });
    successfullyMessage(res, "Admin successfully updated", userUpdated);
  } catch (error) {
    errorMessage(res, error);
  }
};

export const addAdmin = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const newUser = await prismaClient.user.create({
      data,
      include: {
        permissions: true,
      },
    });
    res.send(newUser);
  } catch (error) {
    errorMessage(res, error);
  }
};

export const deleteAdmin = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const userDeleted = await prismaClient.user.delete({
      where: { id },
    });

    successfullyMessage(res, "Admin successfully deleted", userDeleted);
  } catch (error) {
    errorMessage(res, error);
  }
};
