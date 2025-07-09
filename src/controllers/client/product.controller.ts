import { Request, Response } from "express";

export const getDetailPage = async (req: Request, res: Response) => {
  return res.render("client/product/detail");
};