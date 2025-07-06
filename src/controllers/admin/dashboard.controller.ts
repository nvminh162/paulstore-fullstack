import { Request, Response } from "express";

export const getDashBoardPage = async (req: Request, res: Response) => {
    return res.render("admin/dashboard/show")
}
