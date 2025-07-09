import { Request, Response } from "express";
import { handleGetAProductById } from "services/product.service";

export const getDetailPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await handleGetAProductById(+id);
  return res.render("client/product/detail", { product });
};
