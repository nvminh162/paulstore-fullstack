import { Request, Response } from "express";
import {
  handleCreateProduct,
  handleDeleteProduct,
  handleGetAllProducts,
  handleGetAProductById,
  handleUpdateProduct,
} from "services/product.service";

export const getProductPage = async (req: Request, res: Response) => {
  const products = await handleGetAllProducts();
  return res.render("admin/product/show", { products: products });
};

export const getCreateProductPage = async (req: Request, res: Response) => {
  return res.render("admin/product/create");
};

export const postCreateProduct = async (req: Request, res: Response) => {
  const { name, price, shortDesc, quantity, detailDesc, factory, target } =
    req.body;
  //from multer lib to get here
  const file = req.file;
  const image = file?.filename ?? null;
  //   console.log("check data: >>> ", req.body);
  //   console.log("check file: >>> ", image);

  //   handle create product
  await handleCreateProduct(
    name,
    parseInt(price),
    shortDesc,
    parseInt(quantity),
    detailDesc,
    factory,
    target,
    image
  );
  return res.redirect("/admin/product");
};

export const postDeleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  await handleDeleteProduct(id);
  return res.redirect("/admin/product");
};

export const getDetailProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await handleGetAProductById(id);
  return res.render("admin/product/detail", { id: id, product: product });
};

export const postUpdateProduct = async (req: Request, res: Response) => {
  const { id, name, price, shortDesc, quantity, detailDesc, factory, target } =
    req.body;
  const file = req.file;
  const image = file?.filename;

  await handleUpdateProduct(
    id,
    name,
    parseInt(price),
    shortDesc,
    parseInt(quantity),
    detailDesc,
    factory,
    target,
    image
  );

  return res.redirect("/admin/product");
};
