import { Request, Response } from "express";
import {
  addProductToCart,
  deleteProductInCart,
  getProductInCart,
  updateCartDetailBeforeCheckout,
} from "services/cart.service";
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

export const getCartPage = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) return res.redirect("/login");

  const cartDetails = await getProductInCart(+user.id);

  const totalPrice = cartDetails
    ?.map((item) => +item.price * +item.quantity)
    ?.reduce((a, b) => a + b, 0);

  return res.render("client/product/cart", { cartDetails, totalPrice });
};

export const postDeleteProductInCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  if (!user) return res.redirect("/login");

  await deleteProductInCart(+id, user.id, user.sumCart);

  return res.redirect("/cart");
};

export const getCheckoutPage = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) return res.redirect("/login");

  const cartDetails = await getProductInCart(+user.id);

  const totalPrice = cartDetails
    ?.map((item) => +item.price * +item.quantity)
    ?.reduce((a, b) => a + b, 0);

  return res.render("client/product/checkout", {
    cartDetails,
    totalPrice,
  });
};

export const postHandleCartToCheckout = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) return res.redirect("/login");

  const currentCartDetail: { id: string; quantity: string }[] =
    req.body?.cartDetails ?? [];

  await updateCartDetailBeforeCheckout(currentCartDetail);

  return res.redirect("/checkout");
};
