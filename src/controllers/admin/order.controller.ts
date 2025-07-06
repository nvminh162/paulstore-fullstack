import { Request, Response } from "express";

export const getAdminOrderPage = async (req: Request, res: Response) => {
    return res.render("admin/order/show")
}
