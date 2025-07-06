import { Request, Response } from "express";
import { handleGetAllUsers } from "services/user.service";

export const getAdminUserPage = async (req: Request, res: Response) => {
    const users = await handleGetAllUsers();
    return res.render("admin/user/show", { users: users })
}

export const getAdminCreateUserPage = async (req: Request, res: Response) => {
    return res.render("admin/user/create")
}