import express, { Express } from "express";

import {
  getCreateUserPage,
  getDetailUser,
  getUserPage,
  postCreateUser,
  postDeleteUser,
  postUpdateUser,
} from "controllers/admin/user.controller";
import { getDashBoardPage } from "controllers/admin/dashboard.controller";
import { getOrderDetailPage, getOrderPage } from "controllers/admin/order.controller";
import {
  getCreateProductPage,
  getDetailProduct,
  getProductPage,
  postCreateProduct,
  postDeleteProduct,
  postUpdateProduct,
} from "controllers/admin/product.controller";
import fileUploadMiddleware from "src/middleware/multer";
import { getHomePage, getProductsWithFilterPage } from "controllers/client/user.controller";
import {
  getCartPage,
  getCheckoutPage,
  getDetailPage,
  getOrderHistoryPage,
  getThanksPage,
  postDeleteProductInCart,
  postHandleCartToCheckout,
  postPlaceOrder,
  postProductToCart,
} from "controllers/client/product.controller";
import {
  getLoginPage,
  getRegisterPage,
  getSuccessRedirectPage,
  postLogout,
  postRegister,
} from "controllers/client/auth.controller";
import passport from "passport";
import { isAdmin } from "src/middleware/auth";

const router = express.Router();

const webRoutes = (app: Express) => {
  //ADMIN -----------------------------------------------
  router.get("/admin", getDashBoardPage);
  //User
  router.get("/admin/user", getUserPage);
  router.get("/admin/user/create", getCreateUserPage);
  router.post(
    "/admin/user/create",
    fileUploadMiddleware("avatar", "images/user"),
    postCreateUser
  );
  router.post("/admin/user/delete/:id", postDeleteUser);
  router.get("/admin/user/detail/:id", getDetailUser);
  router.post(
    "/admin/user/detail",
    fileUploadMiddleware("avatar", "images/user"),
    postUpdateUser
  );

  //Product
  router.get("/admin/product", getProductPage);
  router.get("/admin/product/create", getCreateProductPage);
  router.post(
    "/admin/product/create",
    fileUploadMiddleware("image", "images/product"),
    postCreateProduct
  );
  router.post("/admin/product/delete/:id", postDeleteProduct);
  router.get("/admin/product/detail/:id", getDetailProduct);
  router.post(
    "/admin/product/detail",
    fileUploadMiddleware("image", "images/product"),
    postUpdateProduct
  );

  //Order
  router.get("/admin/order", getOrderPage);
  router.get("/admin/order/:id", getOrderDetailPage);

  //CLIENT -----------------------------------------------
  router.get("/", getHomePage);
  router.get("/products", getProductsWithFilterPage);
  router.get("/success-redirect", getSuccessRedirectPage);
  router.get("/register", getRegisterPage);
  router.post("/register", postRegister);
  router.post("/logout", postLogout);
  router.get("/login", getLoginPage);
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/success-redirect",
      failureRedirect: "/login",
      failureMessage: true,
    })
  );
  router.get("/product/:id", getDetailPage);

  router.post("/add-product-to-cart/:id", postProductToCart);
  router.get("/cart", getCartPage);
  router.post("/delete-product-in-cart/:id", postDeleteProductInCart);
  router.get("/checkout", getCheckoutPage)
  router.post("/handle-cart-to-checkout", postHandleCartToCheckout)
  router.post("/place-order", postPlaceOrder)
  router.get("/thanks", getThanksPage)
  router.get("/order-history", getOrderHistoryPage)

  app.use("/", isAdmin, router);
};

export default webRoutes;
