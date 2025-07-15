import { Request, Response } from "express";
import { countTotalProducts, handleGetAllProducts, handleGetAllProductsWithPagination } from "services/product.service";

export const getHomePage = async (req: Request, res: Response) => {
  const { page } = req.query;
  let currentPage = page ? +page : 1;

  if (currentPage <= 0) currentPage = 1;

  const products = await handleGetAllProductsWithPagination(currentPage);
  const totalPages = await countTotalProducts();

  return res.render("client/home/show", { products, totalPages, currentPage });
};
