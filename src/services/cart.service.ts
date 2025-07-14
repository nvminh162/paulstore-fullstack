import { prisma } from "config/client";

export const addProductToCart = async (
  quantity: number,
  productId: number,
  user: Express.User
) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userId: user.id,
    },
  });

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (cart) {
    //update
    // update sum cart
    await prisma.cart.update({
      where: { id: cart.id },
      data: { sum: { increment: quantity } },
    });
    //update cart detail
    const currentCartDetail = await prisma.cartDetail.findFirst({
      where: {
        productId: productId,
        cartId: cart.id,
      },
    });

    // if don't have create new, if have update quantity
    await prisma.cartDetail.upsert({
      //update + insert
      where: {
        id: currentCartDetail?.id ?? 0,
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        price: product.price,
        quantity: quantity,
        productId: productId,
        cartId: cart.id,
      },
    });
  } else {
    //create
    await prisma.cart.create({
      data: {
        sum: quantity,
        userId: user.id,
        cartDetails: {
          create: [
            {
              price: product.price,
              quantity: quantity,
              productId: productId,
            },
          ],
        },
      },
    });
  }
};

export const getProductInCart = async (userId: number) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (cart) {
    const currentCartDetail = await prisma.cartDetail.findMany({
      where: { cartId: cart.id },
      include: { product: true },
    });
    return currentCartDetail;
  }

  return [];
};

export const deleteProductInCart = async (
  cartDetailId: number,
  userId: number,
  sumCart: number
) => {
  // Lấy thông tin cart detail trước khi xóa
  const currentCartProductQuantity = await prisma.cartDetail.findFirst({
    where: { id: cartDetailId },
    select: {
      quantity: true,
      cartId: true,
    },
  });

  // Kiểm tra nếu cart detail không tồn tại
  if (!currentCartProductQuantity) {
    throw new Error("Cart detail not found");
  }

  // Xóa cart detail
  await prisma.cartDetail.delete({
    where: { id: cartDetailId },
  });

  // Kiểm tra số lượng cart detail còn lại trong cart
  const remainingCartDetails = await prisma.cartDetail.count({
    where: { cartId: currentCartProductQuantity.cartId },
  });

  if (remainingCartDetails === 0) {
    // Xóa cart nếu không còn sản phẩm nào
    await prisma.cart.delete({
      where: { userId },
    });
  } else {
    // Cập nhật tổng số lượng trong cart
    await prisma.cart.update({
      where: { userId },
      data: { sum: { decrement: currentCartProductQuantity.quantity } },
    });
  }
};

export const updateCartDetailBeforeCheckout = async (data: { id: string; quantity: string }[]) => {
  for (let i = 0; i < data.length; i++) {
    await prisma.cartDetail.update({
      where: {
        id: +(data[i].id)
      },
      data: {
        quantity: +(data[i].quantity)
      }
    });
  }
}
