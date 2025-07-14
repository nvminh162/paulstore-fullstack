import { prisma } from "config/client";

export const getOrders = async () => {
  return await prisma.order.findMany({
    include: { user: true },
  });
};

export const getOrderDetails = async (orderId: number) => {
  return await prisma.orderDetail.findMany({
    where: { orderId },
    include: {
      product: true,
    },
  });
};

export const getOrderHistory = async (userId: number) => {
  return await prisma.order.findMany({
    where: { userId },
    include: { orderDetails: { include: { product: true } } },
  });
};
  