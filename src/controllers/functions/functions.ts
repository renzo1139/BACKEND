import { Response } from "express";

export const errorMessage = (res: Response, error: any) => {
  return res.status(404).json({
    message: "Error",
    error,
  });
};

export const successfullyMessage = (res: Response, message: string, data: any) => {
  return res.status(200).json({
    message,
    data,
  });
};
