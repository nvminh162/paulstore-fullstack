import express, { Express } from "express";
import {
  getHomePage,
  getCreateUserPage,
  postCreateUser,
  postDeleteUser,
  getViewUserPage,
  postUpdateUser,
} from "controllers/user.controller";
import { getDashBoardPage } from "controllers/admin/dashboard.controller";
import { getAdminCreateUserPage, getAdminUserPage } from "controllers/admin/user.controller";
import { getAdminOrderPage } from "controllers/admin/order.controller";
import { getAdminProductPage } from "controllers/admin/product.controller";

const router = express.Router();

const webRoutes = (app: Express) => {
  router.get("/", getHomePage);
  router.get("/create-user", getCreateUserPage);
  router.post("/handle-create-user", postCreateUser);
  router.post("/handle-delete-user/:id", postDeleteUser);
  router.get("/handle-view-user/:id", getViewUserPage);
  router.post("/handle-update-user", postUpdateUser);

  //admin
  router.get("/admin", getDashBoardPage);
  router.get("/admin/user", getAdminUserPage);
  router.get("/admin/user/create", getAdminCreateUserPage);

  
  router.get("/admin/order", getAdminOrderPage);
  router.get("/admin/product", getAdminProductPage);

  app.use("/", router);
};

export default webRoutes;
