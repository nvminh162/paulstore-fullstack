import { prisma } from "config/client";

export const handleGetAllProducts = async () => {
  return prisma.product.findMany();
};

export const handleCreateProduct = async (
  name: string,
  price: number,
  shortDesc: string,
  quantity: number,
  detailDesc: string,
  factory: string,
  target: string,
  image: string
) => {
  return await prisma.product.create({
    data: {
      name: name,
      price: price,
      shortDesc: shortDesc,
      quantity: quantity,
      detailDesc: detailDesc,
      factory: factory,
      target: target,
      sold: 0,
      ...(image && { image: image }),
    },
  });
};

export const handleDeleteProduct = async (id: string) => {
  return await prisma.product.delete({
    where: {
      id: +id,
    },
  });
};

export const handleGetAProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: {
      id: +id,
    },
  });
};

export const handleUpdateProduct = async (
  id: string,
  name: string,
  price: number,
  shortDesc: string,
  quantity: number,
  detailDesc: string,
  factory: string,
  target: string,
  image?: string
) => {
  // Prepare update data
  const updateData: any = {
    name: name,
    price: price,
    shortDesc: shortDesc,
    quantity: quantity,
    detailDesc: detailDesc,
    factory: factory,
    target: target,
  };

  // Only update image if a new one is provided
  if (image) {
    updateData.image = image;
  }

  return await prisma.product.update({
    where: {
      id: +id, //convert string to number : (+string => number)
    },
    data: updateData,
  });
};

export const handlePlaceOrder = async (
  userId: number,
  receiverName: string,
  receiverAddress: string,
  receiverPhone: string,
  totalPrice: number
) => {
  try {
    await prisma.$transaction(async (tx) => {
      const cart = await tx.cart.findUnique({
        where: {
          userId,
        },
        include: {
          cartDetails: true,
        },
      });

      if (cart) {
        //create
        const dataOrderDetail =
          cart?.cartDetails?.map((item) => ({
            price: item.price,
            quantity: item.quantity,
            productId: item.productId,
          })) ?? [];
        await tx.order.create({
          data: {
            receiverName,
            receiverAddress,
            receiverPhone,
            paymentMethod: "COD",
            paymentStatus: "PAYMENT_UNPAID",
            status: "PENDING",
            totalPrice: totalPrice,
            userId,
            orderDetails: {
              create: dataOrderDetail,
            },
          },
        });

        //remove cartDetail vs cart
        await tx.cartDetail.deleteMany({
          where: { cartId: cart.id },
        });
        await tx.cart.delete({ where: { id: cart.id } });
      }

      //check product
      for (let i = 0; i < cart.cartDetails.length; i++) {
        const productId = cart.cartDetails[i].productId;
        const product = await tx.product.findUnique({
          where: { id: productId },
        });
        if (!product || product.quantity < cart.cartDetails[i].quantity) {
          throw new Error(
            `Sản phẩm ${product?.name} không tồn tại hoặc không đủ số lượng`
          );
        }

        await tx.product.update({
          where: { id: productId },
          data: {
            quantity: {
              decrement: cart.cartDetails[i].quantity,
            },
            sold: {
              increment: cart.cartDetails[i].quantity,
            },
          },
        });
      }
    });
    return "";
  } catch (error) {
    return error.message;
  }
};
