import { Request, Response } from "express";

export const getHomePage = async (req: Request, res: Response) => {
  return res.render("client/home/show");
};