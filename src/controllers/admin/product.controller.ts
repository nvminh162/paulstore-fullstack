import { Request, Response } from "express";
import {
  handleCreateProduct,
  handleDeleteProduct,
  handleGetAllProducts,
  handleGetAProductById,
  handleUpdateProduct,
} from "services/product.service";
import { ProductSchema, TProductSchema } from "src/validation/product.schema";

export const getProductPage = async (req: Request, res: Response) => {
  const products = await handleGetAllProducts();
  return res.render("admin/product/show", { products: products });
};

export const getCreateProductPage = async (req: Request, res: Response) => {
  const errors = [];
  const oldData = {
    name: "",
    price: "",
    shortDesc: "",
    quantity: "",
    detailDesc: "",
    factory: "",
    target: "",
  };
  return res.render("admin/product/create", { errors, oldData });
};

export const postCreateProduct = async (req: Request, res: Response) => {
  const { name, price, shortDesc, quantity, detailDesc, factory, target } =
    req.body as TProductSchema;
  //from multer lib to get here
  const file = req.file;
  const image = file?.filename ?? null;
  //   console.log("check data: >>> ", req.body);
  //   console.log("check file: >>> ", image);

  const oldData = { name, price, shortDesc, quantity, detailDesc, factory, target };

  const validate = ProductSchema.safeParse(req.body);

  if (!validate.success) {
    //error
    const errorZod = validate.error.issues;
    const errors = errorZod?.map((item) => `${item.message} (${item.path[0]})`);
    return res.render("admin/product/create", { errors, oldData });
  }

  //   handle create product
  await handleCreateProduct(
    name,
    +price,
    shortDesc,
    +quantity,
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
  const product = await handleGetAProductById(+id);
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
