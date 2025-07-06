import { getDashBoardPage } from "controllers/admin/dashboard.controller";
import { getAdminOrderPage } from "controllers/admin/order.controller";
import { getAdminProductPage } from "controllers/admin/product.controller";
import {
  getCreateUserPage,
  getDetailUser,
  getUserPage,
  postCreateUser,
  postDeleteUser,
  postUpdateUser,
} from "controllers/admin/user.controller";
import express, { Express } from "express";
import fileUploadMiddleware from "src/middleware/multer";

const router = express.Router();

const webRoutes = (app: Express) => {
  /* router.get("/", getHomePage);
  router.get("/create-user", getCreateUserPage);
  router.post("/handle-create-user", postCreateUser);
  router.post("/handle-delete-user/:id", postDeleteUser);
  router.get("/handle-view-user/:id", getViewUserPage);
  router.post("/handle-update-user", postUpdateUser); */

  //admin
  router.get("/admin", getDashBoardPage);
  router.get("/admin/user", getUserPage);
  router.get("/admin/user/create", getCreateUserPage);
  router.post(
    "/admin/user/create",
    fileUploadMiddleware("avatar"),
    postCreateUser
  );
  router.post("/admin/user/delete/:id", postDeleteUser);
  router.get("/admin/user/detail/:id", getDetailUser);
  router.post(
    "/admin/user/detail",
    fileUploadMiddleware("avatar"),
    postUpdateUser
  );

  router.get("/admin/order", getAdminOrderPage);
  router.get("/admin/product", getAdminProductPage);

  app.use("/", router);
};

export default webRoutes;
