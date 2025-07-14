import { Request, Response } from "express";
import { getOrderDetails, getOrders } from "services/order.service";

export const getOrderPage = async (req: Request, res: Response) => {
  const orders = await getOrders();

  return res.render("admin/order/show", { orders });
};

export const getOrderDetailPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const orderDetails = await getOrderDetails(+id);

  return res.render("admin/order/detail", { orderDetails, id });
};
