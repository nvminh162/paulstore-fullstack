import { Request, Response } from "express";

export const getAdminProductPage = async (req: Request, res: Response) => {
    return res.render("admin/product/show")
}
