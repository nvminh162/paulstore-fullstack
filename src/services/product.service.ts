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
      image: image,
      sold: 0,
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

export const handleGetAProductById = async (id: string) => {
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
