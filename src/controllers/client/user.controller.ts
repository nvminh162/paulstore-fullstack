import { Request, Response } from "express";
import { handleGetAllProducts } from "services/product.service";

export const getHomePage = async (req: Request, res: Response) => {
  const products = await handleGetAllProducts();

  const user = req.user;

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", user);

  return res.render("client/home/show", { products });
};
