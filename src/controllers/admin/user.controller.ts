import { ACCOUNT_TYPE } from "config/constants";
import { Request, Response } from "express";
import {
  handleCreateUser,
  handleDeleteUser,
  handleGetAllRole,
  handleGetAllUsers,
  handleGetAUserById,
  handleUpdateUser,
} from "services/user.service";

export const getUserPage = async (req: Request, res: Response) => {
  const users = await handleGetAllUsers();
  return res.render("admin/user/show", { users: users });
};

export const getCreateUserPage = async (req: Request, res: Response) => {
  const roles = await handleGetAllRole();
  return res.render("admin/user/create", { roles: roles });
};

export const postCreateUser = async (req: Request, res: Response) => {
  const { fullName, email, address, password, phone, role } = req.body;
  //from multer lib to get here
  const file = req.file;
  const avatar = file?.filename ?? null;
  //   console.log("check data: >>> ", req.body);
  //   console.log("check file: >>> ", avatar);
  //   handle create user
  await handleCreateUser(
    email,
    password,
    fullName,
    address,
    phone,
    ACCOUNT_TYPE.SYSTEM,
    avatar,
    role
  );
  return res.redirect("/admin/user");
};

export const postDeleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await handleDeleteUser(id);
  return res.redirect("/admin/user");
};

export const getDetailUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await handleGetAUserById(id);
  const roles = await handleGetAllRole();
  return res.render("admin/user/detail", { id: id, user: user, roles: roles });
};

export const postUpdateUser = async (req: Request, res: Response) => {
  const { id, fullName, email, address, password, phone, role } = req.body;
  const file = req.file;
  const avatar = file?.filename ?? null;

  // Only pass password if it's not empty
  const passwordToUpdate = password && password.trim() !== "" ? password : null;

  await handleUpdateUser(
    id,
    email,
    passwordToUpdate,
    fullName,
    address,
    phone,
    ACCOUNT_TYPE.SYSTEM,
    avatar,
    role
  );

  return res.redirect("/admin/user");
};
