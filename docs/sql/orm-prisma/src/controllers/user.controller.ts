import { Request, Response } from "express";
import {
  handleGetAllUsers,
  handleCreateUser,
  handleDeleteUser,
  handleGetAUserById,
  handleUpdateUser,
} from "services/user.service";

const getHomePage = async (req: Request, res: Response) => {
  //get users
  const users = await handleGetAllUsers();
  return res.render("home", { users: users });
};

const getCreateUserPage = (req: Request, res: Response) => {
  return res.render("create-user");
};

const postCreateUser = async (req: Request, res: Response) => {
  const { fullName, email, address } = req.body;
  // console.log("check data: >>> ", req.body);
  // console.log("check data: >>> ", fullName, email, address);

  //handle create user
  await handleCreateUser(fullName, email, address);
  return res.redirect("/");
};

const postDeleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await handleDeleteUser(id);
  return res.redirect("/");
};

const getViewUserPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await handleGetAUserById(id);
  return res.render("view-user", { id: id, user: user });
};

const postUpdateUser = async (req: Request, res: Response) => {
  const { id, fullName, email, address } = req.body;
  await handleUpdateUser(id, fullName, email, address);
  return res.redirect("/");
};

export {
  getHomePage,
  getCreateUserPage,
  postCreateUser,
  postDeleteUser,
  getViewUserPage,
  postUpdateUser,
};
