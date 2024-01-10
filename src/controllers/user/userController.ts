import { Request, Response } from "express";
import { prismaClient } from "../../routes/index.routes";
import { errorMessage, successfullyMessage } from "../functions/functions";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prismaClient.user.findMany({
      include: {
        permissions: true,
      },
    });
    res.send(users);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const getUserByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userFounded = await prismaClient.user.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        permissions: true,
      },
    });
    res.send(userFounded);
  } catch (error) {
    errorMessage(res, error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const { id } = req.params;

    const userUpdated = await prismaClient.user.update({
      where: {
        id: Number(id),
      },
      data,
    });
    successfullyMessage(res, "User successfully updated", userUpdated);
  } catch (error) {
    errorMessage(res, error);
  }
};

export const addUser = async (req: Request, res: Response) => {
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

export const makeAdmin = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const userUpdated = await prismaClient.user.update({
      where: {
        id: Number(id),
      },
      data: {
        role: "admin",
      },
    });
    successfullyMessage(res, "User successfully updated", userUpdated);
  } catch (error) {
    errorMessage(res, error);
  }
};

export const deleteAdmin = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const userUpdated = await prismaClient.user.update({
      where: {
        id: Number(id),
      },
      data: {
        role: "user",
      },
    });
    successfullyMessage(res, "User successfully updated", userUpdated);
  } catch (error) {
    errorMessage(res, error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const userDeleted = await prismaClient.user.delete({
      where: { id },
    });

    successfullyMessage(res, "User successfully deleted", userDeleted);
  } catch (error) {
    errorMessage(res, error);
  }
};

export const addPermision = async (req: Request, res: Response) => {
  const { id, permissionName } = req.body;

  try {
    const userFounded = await prismaClient.user.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        permissions: true, // Include current permissions
      },
    });

    if (userFounded) {
      // Disconnect all existing permissions
      const disconnectPermissions = userFounded.permissions.map((permission:{ id: number }) => ({
        id: permission.id,
      }));

      // Create new permission
      const permissionCreated = await prismaClient.permission.create({
        data: {
          name: permissionName,
        },
      });

      // Update user to disconnect old permissions and connect new one
      await prismaClient.user.update({
        where: {
          id: Number(id),
        },
        data: {
          permissions: {
            disconnect: disconnectPermissions,
            connect: {
              id: permissionCreated.id,
            },
          },
        },
      });

      successfullyMessage(res, "Permission successfully added", permissionCreated);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    errorMessage(res, error);
  }
};

export const deletePermissionInUser = async (req: Request, res: Response) => {
  const { id, permissionName } = req.body;

  try {
    const userFounded = await prismaClient.user.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (userFounded) {
      const permission = await prismaClient.permission.findFirst({
        where: {
          name: permissionName,
        },
      });

      if (permission) {
        const updatedUser = await prismaClient.user.update({
          where: {
            id: Number(id),
          },
          data: {
            permissions: {
              disconnect: {
                id: permission.id,
              },
            },
          },
        });

        successfullyMessage(res, "Permission successfully deleted from user", updatedUser);
      } else {
        res.status(404).json({ message: "Permission not found" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    errorMessage(res, error);
  }
};
// asas