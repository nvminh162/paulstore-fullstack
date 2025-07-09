import { Request, Response } from "express";

export const getOrderPage = async (req: Request, res: Response) => {
    return res.render("admin/order/show")
}
