import { Request, Response } from "express";
import {
  getProductsWithFilter,
} from "services/product.filter.service";
import {
  countTotalProducts,
  handleGetAllProductsWithPagination,
} from "services/product.service";

export const getHomePage = async (req: Request, res: Response) => {
  const { page } = req.query;
  let currentPage = page ? +page : 1;

  if (currentPage <= 0) currentPage = 1;

  const products = await handleGetAllProductsWithPagination(currentPage);
  const totalPages = await countTotalProducts();

  return res.render("client/home/show", { products, totalPages, currentPage });
};

export const getProductsWithFilterPage = async (
  req: Request,
  res: Response
) => {
  const {
    page,
    factory = "",
    target = "",
    price = "",
    sort = "",
  } = req.query as {
    page?: string;
    factory: string;
    target: string;
    price: string;
    sort: string;
  };
  let currentPage = page ? +page : 1;

  if (currentPage <= 0) currentPage = 1;

  const data = await getProductsWithFilter(
    currentPage,
    6,
    factory,
    target,
    price,
    sort
  );

  return res.render("client/product/filter", {
    products: data.products,
    totalPages: +data.totalPages,
    currentPage,
  });
};
