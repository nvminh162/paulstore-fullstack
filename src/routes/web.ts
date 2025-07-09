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
import { getOrderPage } from "controllers/admin/order.controller";
import {
  getCreateProductPage,
  getDetailProduct,
  getProductPage,
  postCreateProduct,
  postDeleteProduct,
  postUpdateProduct,
} from "controllers/admin/product.controller";
import fileUploadMiddleware from "src/middleware/multer";
import { getHomePage } from "controllers/client/user.controller";
import { getDetailPage } from "controllers/client/product.controller";

const router = express.Router();

const webRoutes = (app: Express) => {
  router.get("/", getHomePage);
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

  //CLIENT -----------------------------------------------
  router.get("/product/:id", getDetailPage);

  app.use("/", router);
};

export default webRoutes;
