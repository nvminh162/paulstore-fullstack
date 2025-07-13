import { Request, Response } from "express";
import { addProductToCart } from "services/cart.service";
import { handleGetAProductById } from "services/product.service";

export const getDetailPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await handleGetAProductById(+id);
  return res.render("client/product/detail", { product });
};

export const postProductToCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;

  if (user) {
    await addProductToCart(1, +id, user);
  } else {
    return res.redirect("/login");
  }

  return res.redirect("/");
};
