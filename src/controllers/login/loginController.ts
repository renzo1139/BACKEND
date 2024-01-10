import { Request, Response } from "express";
import { prismaClient } from "../../routes/index.routes";

export const loginService = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const userFounded = await prismaClient.user.findFirst({
      where: {
        name: username,
      },
    });

    if (userFounded) {
      if (userFounded.password === password) {
        res.send({
          message: "login success",
          role: userFounded.role,
        });
      } else {
        res.status(404).json({ message: "login failed" });
      }
    } else {
      res.status(404).json({ message: "login failed" });
    }
  } catch (error) {
    res.status(404).json({ message: "login failed" });
  }
};
